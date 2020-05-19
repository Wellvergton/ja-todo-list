import React from "react";
import "./App.scss";

import Todo from "./components/Todo/Todo";
import data from "./mock-todos";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: data};
    this.delete = this.delete.bind(this);
  }
  
  delete(todoTitle) {
    this.setState({
      data: this.state.data.map((todo) => {
        if (todo.title === todoTitle) todo.status = "deleted";
        return todo;
      })
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
      todos[todo.status].push(
        <Todo data={todo} key={todo.title} onDelete={this.delete} />
      )
    }

    let sections = [];

    for (let todoType in todos) {
      if (todoType !== "deleted") {
        sections.push(
          <section key={todoType}>
            {
              todos[todoType].length > 0 &&
              <p className="h3 font-weight-bold">
                {todoType.replace(todoType[0], todoType[0].toUpperCase())}
              </p>
            }
            {todos[todoType]}
          </section>
        );
      }
    }

    return (
      <div className="App">
        {sections}
      </div>
    );
  }
}

export default App;
