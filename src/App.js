import React from "react";
import "./App.scss";

import Todo from "./components/Todo/Todo";

function App() {
  let data = {
    todo1: {
      status: "today",
      title: "Today",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "daily",
      date: "",
    },

    todo2: {
      status: "pending",
      title: "Weekly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "weekly",
      date: {
        mon: false,
        tue: true,
        wed: false,
        thu: true,
        fri: false,
        sat: true,
        sun: false,
      },
    },

    todo3: {
      status: "pending",
      title: "Monthly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "monthly",
      date: { day: 30 },
    },

    todo4: {
      status: "pending",
      title: "Yearly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "yearly",
      date: { day: 14, month: 11 },
    },

    todo5: {
      status: "pending",
      title: "Someday",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      date: "",
    },

    todo6: {
      status: "deleted",
      title: "Deleted",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      date: "",
    },

    todo7: {
      status: "concluded",
      title: "Checked",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      date: "",
    },

    todo8: {
      status: "delayed",
      title: "Delayed",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "yearly",
      date: { day: 1, month: 0 },
    },
  };

  let todos = [];

  for (let todo in data) {
    if (!data[todo].status !== "deleted") {
      todos.push(<Todo data={data[todo]} key={data[todo].title} />);
    }
  }

  return <div className="App">{todos}</div>;
}

export default App;
