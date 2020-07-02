import React from "react";
import "./index.scss";
import Card from "react-bootstrap/Card";

import Main from "./Main";
import TodoData from "./TodoData";
import InfoToggler from "./InfoToggler";
import {
  deleteTodo as onDelete,
  restoreTodo as onRestore,
  concludeTodo as onConclude,
} from "../todoManager";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.todo = React.createRef();
    this.showCardBody = false;
    this.cardBody = React.createRef();
    this.hideTodoBody = this.hideTodoBody.bind(this);
    this.fadeAndMakeAnAction = this.fadeAndMakeAnAction.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.actions = { onDelete, onRestore, onConclude };
  }

  hideTodoBody() {
    if (this.showCardBody === false) {
      this.cardBody.current.style.display = "block";
      this.cardBody.current.style.height = `${this.cardBody.current.scrollHeight}px`;
      this.showCardBody = true;
    } else {
      this.cardBody.current.style.height = "0";
      setTimeout(() => (this.cardBody.current.style.display = "none"), 500);
      this.showCardBody = false;
    }
  }

  fadeOutTodo() {
    return new Promise((resolve, reject) => {
      this.todo.current.animate(
        [
          { height: `${this.todo.current.scrollHeight}px` },
          { height: "0px", opacity: "0", margin: "0" },
        ],
        { duration: 100 }
      );

      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  onEdit() {
    this.props.onEdit(this.props.data);
  }

  async fadeAndMakeAnAction(action) {
    await this.fadeOutTodo();
    this.actions[action](this.props.data.id);
  }

  render() {
    let colors = {
      concluded: "secondary",
      deleted: "dark",
      delayed: "danger",
      today: "warning",
      someday: "success",
      pending: "primary",
    };
    let cardColor = colors[this.props.data.status];
    let textColor = cardColor === "warning" ? "dark" : "white";

    return (
      <div className={"Todo my-2"} ref={this.todo}>
        <Card bg={cardColor} text={textColor}>
          <Card.Header className="py-1">
            <Main
              title={this.props.data.title}
              status={this.props.data.status}
              action={this.fadeAndMakeAnAction}
            />
          </Card.Header>
          <Card.Body className="py-0" ref={this.cardBody}>
            <TodoData
              description={this.props.data.description}
              infoType={this.props.data.type}
              date={this.props.data.date}
              onEdit={this.onEdit}
            />
          </Card.Body>
          <Card.Footer className="p-0">
            <InfoToggler
              bgColor={cardColor}
              textColor={`${textColor}`}
              onClick={this.hideTodoBody}
            />
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default Todo;
