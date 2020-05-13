import React from "react";
import "./App.scss";

import Todo from "./components/Todo/Todo";

function App() {
  let data = {
    todo1: {
      isChecked: false,
      isDeleted: false,
      title: "Daily",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "daily",
      repetition: "",
    },

    todo2: {
      isChecked: false,
      isDeleted: false,
      title: "Weekly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "weekly",
      repetition: {
        mon: false,
        tue: true,
        wed: true,
        thu: true,
        fri: false,
        sat: true,
        sun: false,
      },
    },

    todo3: {
      isChecked: false,
      isDeleted: false,
      title: "Monthly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "monthly",
      repetition: { day: 12 },
    },

    todo4: {
      isChecked: false,
      isDeleted: false,
      title: "Yearly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "yearly",
      repetition: { day: 14, month: 5 },
    },

    todo5: {
      isChecked: false,
      isDeleted: false,
      title: "Someday",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      repetition: "",
    },

    todo6: {
      isChecked: false,
      isDeleted: true,
      title: "Deleted",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      repetition: null,
    },

    todo7: {
      isChecked: true,
      isDeleted: false,
      title: "Checked",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      repetition: "",
    },
  };

  let todos = [];

  for (let todo in data) {
    if (!data[todo].isDeleted) {
      todos.push(<Todo data={data[todo]} key={data[todo].title} />);
    }
  }

  return <div className="App">{todos}</div>;
}

export default App;
