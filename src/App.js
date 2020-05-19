import React from "react";
import "./App.scss";

import Todo from "./components/Todo/Todo";

function App() {
  let data = [
    {
      status: "today",
      title: "Today",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "daily",
      date: "",
    },

    {
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

    {
      status: "pending",
      title: "Monthly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "monthly",
      date: { day: 30 },
    },

    {
      status: "pending",
      title: "Yearly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "yearly",
      date: { day: 14, month: 11 },
    },

    {
      status: "someday",
      title: "Someday",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      date: "",
    },

    {
      status: "deleted",
      title: "Deleted",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      date: "",
    },

    {
      status: "concluded",
      title: "Checked",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "someday",
      date: "",
    },

    {
      status: "delayed",
      title: "Delayed",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia in temporibus impedit",
      type: "yearly",
      date: { day: 1, month: 0 },
    },
  ];

  let todos = {
    delayed: [],
    today: [],
    pending: [],
    someday: [],
    concluded: [],
    deleted: [],
  };

  for (let todo of data) {
    todos[todo.status].push(<Todo data={todo} key={todo.title} />)
  }

  return (
    <div className="App">
      {todos.delayed.length > 0 && <p className="h3">Delayed</p>}
      {todos.delayed}
      {todos.today.length > 0 && <p className="h3">Today</p>}
      {todos.today}
      {todos.pending.length > 0 && <p className="h3">Soon</p>}
      {todos.pending}
      {todos.someday.length > 0 && <p className="h3">Someday</p>}
      {todos.someday}
      {todos.concluded.length > 0 && <p className="h3">Concluded</p>}
      {todos.concluded}
      {todos.deleted.length > 0 && <p className="h3">Deleted</p>}
      {todos.deleted}
    </div>
  );
}

export default App;
