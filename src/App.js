import React from "react";
import "./App.scss";

import Todo from "./components/Todo/Todo";

function App() {
  let data = {
    todo1: {
      isChecked: false,
      isDeleted: false,
      title: "All in",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      daysOfTheWeek: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    },

    todo2: {
      isChecked: true,
      isDeleted: false,
      title: "Checked",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      daysOfTheWeek: ["seg", "ter", "qua", "qui"],
    },

    todo3: {
      isChecked: true,
      isDeleted: true,
      title: "Lorem ipsum dolor sit amet, consectetur",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      daysOfTheWeek: ["seg", "qua", "sex", "sab"],
    },

    todo4: {
      isChecked: false,
      isDeleted: false,
      title: "No repeat",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      daysOfTheWeek: [],
    },
  };

  let todos = [];

  for (let todo in data) {
    if (!data[todo].isDeleted) {
      todos.push(<Todo bgColor="primary" data={data[todo]} />);
    }
  }

  return <div className="App">{todos}</div>;
}

export default App;
