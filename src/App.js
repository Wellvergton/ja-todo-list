import React from "react";
import "./App.scss";

import CreateContextModal from "./CreateContextModal/CreateContextModal";
import CreateTodoModal from "./CreateTodoModal/CreateTodoModal";
import Todo from "./Todo/Todo";
import ToolBar from "./ToolBar/ToolBar";
import DeletedTodosSection from "./DeletedTodosSection/DeletedTodosSection";
import data from "./mock-todos";
import setProperStatus from "./setProperStatus";
import setFirstDate from "./setFirstDate";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: data,
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

  deleteTodo(title, context) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.title === title && todo.context === context) {
          todo.status = "deleted";
        }
        return todo;
      }),
    });
  }

  restoreTodo(title, context) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.title === title && todo.context === context) {
          todo.status = "pending";
        }
        return todo;
      }),
    });
  }

  concludeTodo(title, context) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.title === title && todo.context === context) {
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

  addTodo(data) {
    const todos = this.state.todos;
    data = setFirstDate(data);
    todos.push(data);
    this.setState({ todos: todos });
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

    for (let todo of this.state.todos) {
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
              <p className="h3 font-weight-bold text-capitalize">
                {todoStatus}
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
            todos={this.state.todos}
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
          {this.state.currentContext === "deleted" ? (
            <DeletedTodosSection
              todos={this.state.todos}
              restoreTodo={this.restoreTodo}
            />
          ) : (
            sections
          )}
        </main>
      </div>
    );
  }
}

export default App;
