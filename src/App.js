import React from "react";
import "./App.scss";

import CreateContextModal from "./CreateContextModal/CreateContextModal";
import CreateTodoModal from "./CreateTodoModal/CreateTodoModal";
import Todo from "./Todo/Todo";
import ToolBar from "./ToolBar/ToolBar";
import data from "./mock-todos";
import setProperStatus from "./setProperStatus";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      contexts: ["general", "deleted", "test"],
      currentContext: "general",
      showCreateContextModal: false,
      showCreateTodoModal: false,
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.restoreTodo = this.restoreTodo.bind(this);
    this.concludeTodo = this.concludeTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.setCurrentContext = this.setCurrentContext.bind(this);
    this.addContext = this.addContext.bind(this);
    this.showHideContextModal = this.showHideContextModal.bind(this);
    this.showHideTodoModal = this.showHideTodoModal.bind(this);
  }

  deleteTodo(todoTitle) {
    this.setState({
      data: this.state.data.map((todo) => {
        if (todo.title === todoTitle) todo.status = "deleted";
        return todo;
      }),
    });
  }

  restoreTodo(todoTitle) {
    this.setState({
      data: this.state.data.map((todo) => {
        if (todo.title === todoTitle) todo.status = "pending";
        return todo;
      }),
    });
  }

  concludeTodo(todoTitle) {
    this.setState({
      data: this.state.data.map((todo) => {
        if (todo.title === todoTitle) {
          if (todo.status !== "concluded") {
            todo.status = "concluded";
          } else {
            todo.status = "pending";
            setProperStatus(todo);
          }
        }
        return todo;
      }),
    });
  }

  addContext(name) {
    let contextsCopy = this.state.contexts;
    contextsCopy.push(name);
    this.setState({ contexts: contextsCopy });
  }

  functions = {
    daily(data) {
      data.date.day = new Date().getDate();
      return data;
    },
    weekly(data) {
      const today = new Date().getDay();

      if (data.date.includes(today)) {
        data.status = "today";
      } else {
        data.status = "pending";
      }

      data.date = data.date.sort();
      return data;
    },
    monthly(data) {
      const date = data.date;

      if (date.day < new Date().getDate()) {
        date.month = new Date().getMonth() + 1;
      } else {
        date.month = new Date().getMonth();
      }

      data.date = date;
      return data;
    },
    yearly(data) {
      let date = new Date();
      date.setDate(data.date.day);
      date.setMonth(data.date.month);

      if (date.getMonth() < new Date().getMonth()) {
        date.getDate() < new Date().getDate()
          ? (data.date.year = date.getFullYear() + 1)
          : (data.date.year = date.getFullYear());
      } else {
        data.date.year = date.getFullYear();
      }

      return data;
    },
  };

  addTodo(data) {
    const todos = this.state.data;
    if (this.functions[data.type]) {
      data = this.functions[data.type](data);
    }
    todos.push(data);
    this.setState({ data: todos });
  }

  setCurrentContext(event) {
    this.setState({ currentContext: event.target.innerHTML });
  }

  showHideContextModal() {
    this.setState({
      showCreateContextModal: !this.state.showCreateContextModal,
    });
  }

  showHideTodoModal() {
    this.setState({
      showCreateTodoModal: !this.state.showCreateTodoModal,
    });
  }

  render() {
    let todos = {
      delayed: [],
      today: [],
      pending: [],
      someday: [],
      concluded: [],
      deleted: [],
    };

    for (let todo of this.state.data) {
      if (
        todo.context === this.state.currentContext ||
        todo.status === "deleted"
      ) {
        todo = setProperStatus(todo);
        todos[todo.status].push(
          <Todo
            data={todo}
            key={todo.title + new Date().getMilliseconds()}
            delete={this.deleteTodo}
            restore={this.restoreTodo}
            conclude={this.concludeTodo}
          />
        );
      }
    }

    let sections = [];

    for (let todoStatus in todos) {
      if (todoStatus !== "deleted") {
        sections.push(
          <section key={todoStatus}>
            {todos[todoStatus].length > 0 && (
              <p className="h3 font-weight-bold">
                {todoStatus.replace(todoStatus[0], todoStatus[0].toUpperCase())}
              </p>
            )}
            {todos[todoStatus]}
          </section>
        );
      }
    }

    return (
      <div className="App">
      {this.state.showCreateContextModal && (
        <CreateContextModal
          show={this.state.showCreateContextModal}
          contexts={this.state.contexts}
          onClose={this.showHideContextModal}
          onSave={this.addContext}
        />
      )}
      {this.state.showCreateTodoModal && (
        <CreateTodoModal
          show={this.state.showCreateTodoModal}
          contexts={this.state.contexts}
          onClose={this.showHideTodoModal}
          onSave={this.addTodo}
        />
      )}
        <ToolBar
          contexts={this.state.contexts}
          contextName={this.state.currentContext}
          addTodo={this.addTodo}
          changeContext={this.setCurrentContext}
          onCreateContext={this.addContext}
          showHideTodoModal={this.showHideTodoModal}
          showHideContextModal={this.showHideContextModal}
        />
        <main>
          {this.state.currentContext === "deleted" ? todos.deleted : sections}
        </main>
      </div>
    );
  }
}

export default App;
