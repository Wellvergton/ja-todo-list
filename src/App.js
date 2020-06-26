import React from "react";
import "./App.scss";

import CreateContextModal from "./CreateContextModal/CreateContextModal";
import CreateTodoModal from "./CreateTodoModal/CreateTodoModal";
import EditTodoModal from "./CreateTodoModal/EditTodoModal";
import Todo from "./Todo/Todo";
import ToolBar from "./ToolBar/ToolBar";
import DeletedTodosSection from "./DeletedTodosSection/DeletedTodosSection";
import data from "./mock-todos";
import setProperStatus from "./setProperStatus";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: data,
      contexts: ["general", "deleted", "test"],
      currentContext: "general",
      showCreateContextModal: false,
      showCreateTodoModal: false,
      showEditTodoModal: false,
      dataForEdit: {},
    };
    this.toolBar = React.createRef();
    this.wrapper = React.createRef();
    this.deleteTodo = this.deleteTodo.bind(this);
    this.restoreTodo = this.restoreTodo.bind(this);
    this.concludeTodo = this.concludeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.setCurrentContext = this.setCurrentContext.bind(this);
    this.addContext = this.addContext.bind(this);
    this.deleteContext = this.deleteContext.bind(this);
    this.showHideContextModal = this.showHideContextModal.bind(this);
    this.showHideCreateTodoModal = this.showHideCreateTodoModal.bind(this);
    this.showHideEditTodoModal = this.showHideEditTodoModal.bind(this);
    this.setPaddingTop = this.setPaddingTop.bind(this);
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.status = "deleted";
        }
        return todo;
      }),
    });
  }

  restoreTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.status = "pending";
        }
        return todo;
      }),
    });
  }

  concludeTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          if (todo.status !== "concluded") {
            todo.status = "concluded";
          } else {
            todo.status = "pending";
          }
        }
        return todo;
      }),
    });
  }

  addTodo(data) {
    const newTodos = this.state.todos;
    const length = newTodos.length;
    data.status = "pending";
    for (let i = 1; i <= length + 1; i++) {
      if (!newTodos.some((todo) => todo.id === i)) {
        data.id = i;
      }
    }
    if (data.type === "weekly") {
      data.date = data.date.sort();
    }
    newTodos.push(data);
    console.log(data);
    this.setState({ todos: newTodos });
  }

  editTodo(data) {
    let newTodos = this.state.todos;
    if (data.type === "weekly") {
      data.date = data.date.sort();
    }
    newTodos = newTodos.map((todo) => (todo.id === data.id ? data : todo));
    this.setState({ todos: newTodos });
  }

  setCurrentContext(name) {
    this.setState({ currentContext: name });
  }

  addContext(name) {
    let contextsCopy = this.state.contexts;
    contextsCopy.push(name);
    this.setState({ contexts: contextsCopy });
    this.setCurrentContext(name);
  }

  deleteContext(name) {
    let filteredTodos = this.state.todos.filter(
      (todo) => todo.context !== name
    );
    let filteredContexts = this.state.contexts.filter(
      (context) => context !== name
    );

    this.setCurrentContext("general");
    this.setState({ todos: filteredTodos, contexts: filteredContexts });
  }

  showHideContextModal() {
    this.setState({
      showCreateContextModal: !this.state.showCreateContextModal,
    });
  }

  showHideCreateTodoModal() {
    this.setState({
      showCreateTodoModal: !this.state.showCreateTodoModal,
    });
  }

  showHideEditTodoModal(data) {
    this.setState({ dataForEdit: data });
    this.setState({
      showEditTodoModal: !this.state.showEditTodoModal,
    });
  }

  setPaddingTop(value) {
    this.wrapper.current.style.paddingTop = `${value}px`;
  }

  componentDidMount() {
    const toolBarHeight = this.toolBar.current.navBar.current.clientHeight;
    this.wrapper.current.style.paddingTop = `${toolBarHeight}px`;
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
            onEdit={this.showHideEditTodoModal}
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
      <div className="App" ref={this.wrapper}>
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
            currentContext={this.state.currentContext}
            todos={this.state.todos}
            onClose={this.showHideCreateTodoModal}
            onSave={this.addTodo}
          />
        )}
        {this.state.showEditTodoModal && (
          <EditTodoModal
            data={this.state.dataForEdit}
            show={this.state.showEditTodoModal}
            contexts={this.state.contexts}
            currentContext={this.state.currentContext}
            todos={this.state.todos}
            onClose={this.showHideEditTodoModal}
            onSave={this.editTodo}
          />
        )}
        <ToolBar
          ref={this.toolBar}
          contexts={this.state.contexts}
          contextName={this.state.currentContext}
          changeContext={this.setCurrentContext}
          onDeleteContext={this.deleteContext}
          showHideTodoModal={this.showHideCreateTodoModal}
          showHideContextModal={this.showHideContextModal}
          onShowMenu={this.setPaddingTop}
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
