import React from "react";
import "./App.scss";

import Todo from "./Todo/Todo";
import data from "./mock-todos";
import setProperStatus from "./setProperStatus";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: data };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.concludeTodo = this.concludeTodo.bind(this);
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
        if (todo.title === todoTitle) todo.status = "concluded";
        return todo;
      }),
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

    return <div className="App">{sections}</div>;
  }
}

export default App;
