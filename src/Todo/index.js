import React, { useRef, useState } from "react";
import "./index.scss";

import Card from "react-bootstrap/Card";

import Main from "./Main";
import TodoData from "./TodoData";
import InfoToggler from "./InfoToggler";
import {
  setTodoAsDeleted as onDelete,
  restoreTodo as onRestore,
  concludeTodo as onConclude,
} from "../todoManager";

export default function Todo(props) {
  const [isCardBodyVisible, setIsCardBodyVisible] = useState(false);
  const todo = useRef(null);
  const cardBody = useRef(null);
  const actions = { onDelete, onRestore, onConclude };

  function hideTodoBody() {
    if (!isCardBodyVisible) {
      cardBody.current.style.display = "block";
      cardBody.current.style.height = `${cardBody.current.scrollHeight}px`;
      setIsCardBodyVisible(true);
    } else {
      cardBody.current.style.height = "0";
      setTimeout(() => (cardBody.current.style.display = "none"), 500);
      setIsCardBodyVisible(false);
    }
  }

  function fadeOutTodo() {
    return new Promise((resolve, reject) => {
      todo.current.animate(
        [
          { height: `${todo.current.scrollHeight}px` },
          { height: "0px", opacity: "0", margin: "0" },
        ],
        { duration: 100 }
      );

      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  function onEdit() {
    props.onEdit(props.data);
  }

  async function fadeAndMakeAnAction(action) {
    await fadeOutTodo();
    actions[action](props.data.id);
  }

  const colors = {
    concluded: "secondary",
    deleted: "dark",
    delayed: "danger",
    today: "warning",
    someday: "success",
    pending: "primary",
  };
  const cardColor = colors[props.data.status];
  const textColor = cardColor === "warning" ? "dark" : "white";

  return (
    <div className={"Todo my-2"} ref={todo}>
      <Card bg={cardColor} text={textColor}>
        <Card.Header className="py-1">
          <Main
            title={props.data.title}
            status={props.data.status}
            action={fadeAndMakeAnAction}
          />
        </Card.Header>
        <Card.Body className="py-0" ref={cardBody}>
          <TodoData
            description={props.data.description}
            infoType={props.data.type}
            date={props.data.date}
            onEdit={onEdit}
          />
        </Card.Body>
        <Card.Footer className="p-0">
          <InfoToggler
            bgColor={cardColor}
            textColor={`${textColor}`}
            onClick={hideTodoBody}
          />
        </Card.Footer>
      </Card>
    </div>
  );
}
