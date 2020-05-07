import React from "react";
import "./Todo.scss";

import Main from "./Main/Main";
import TodoData from "./TodoData/TodoData";
import InfoToggler from "./InfoToggler/InfoToggler";

function Todo(props) {
  return (
    <div className="Todo my-2 mr-2">
      <div
        className={`card bg-${props.bgColor} ${
          props.bgColor === "warning" ? "" : "text-white"
        }`}
      >
        <Main />
        <TodoData />
        <InfoToggler bgColor={props.bgColor} />
      </div>
    </div>
  );
}

export default Todo;
