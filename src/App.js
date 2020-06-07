import React from "react";
import "./App.scss";

import Todo from "./Todo/Todo";
import ToolBar from "./ToolBar/ToolBar";
import data from "./mock-todos";
import setProperStatus from "./setProperStatus";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      contexts: ["general", "deleted"],
      currentContext: "general",
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.concludeTodo = this.concludeTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.setCurrentContext = this.setCurrentContext.bind(this);
    this.addContext = this.addContext.bind(this);
  }

  deleteTodo(todoTitle) {
    this.setState({
      data: this.state.data.map((todo) => {
        if (todo.title === todoTitle) todo.status = "deleted";
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

  addTodo() {
    console.log("addTodo");
  }

  setCurrentContext() {
    console.log("setCurrentContext");
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
      todo = setProperStatus(todo);
      todos[todo.status].push(
        <Todo
          data={todo}
          key={todo.title}
          onDelete={this.deleteTodo}
          onConclude={this.concludeTodo}
        />
      );
    }

    let sections = [];

    for (let todoType in todos) {
      if (todoType !== "deleted") {
        sections.push(
          <section key={todoType}>
            {todos[todoType].length > 0 && (
              <p className="h3 font-weight-bold">
                {todoType.replace(todoType[0], todoType[0].toUpperCase())}
              </p>
            )}
            {todos[todoType]}
          </section>
        );
      }
    }

    return (
      <div className="App">
        <ToolBar
          contexts={this.state.contexts}
          contextName={this.state.currentContext}
          addTodo={this.addTodo}
          changeContext={this.setCurrentContext}
          onCreateContext={this.addContext}
        />
        <main>{sections}</main>
      </div>
    );
  }
}

export default App;
