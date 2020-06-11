import React from "react";
import "./Todo.scss";
import Card from "react-bootstrap/Card";

import Main from "./Main/Main";
import TodoData from "./TodoData/TodoData";
import InfoToggler from "./InfoToggler/InfoToggler";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.todo = React.createRef();
    this.showCardBody = false;
    this.cardBody = React.createRef();
    this.delete = this.delete.bind(this);
    this.restore = this.restore.bind(this);
    this.conclude = this.conclude.bind(this);
    this.hideTodoBody = this.hideTodoBody.bind(this);
  }

  hideTodoBody() {
    if (this.showCardBody === false) {
      this.cardBody.current.style.height = `${this.cardBody.current.scrollHeight}px`;
      this.showCardBody = true;
    } else {
      this.cardBody.current.style.height = "0";
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

  async delete() {
    await this.fadeOutTodo();
    this.props.onDelete(this.props.data.title);
  }

  async restore() {
    await this.fadeOutTodo();
    this.props.onRestore(this.props.data.title);
  }

  async conclude() {
    await this.fadeOutTodo();
    this.props.onConclude(this.props.data.title);
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
              onClickInRestore={this.restore}
              onClickInDelete={this.delete}
              onClickInCheck={this.conclude}
            />
          </Card.Header>
          <Card.Body className="py-0" ref={this.cardBody}>
            <TodoData
              description={this.props.data.description}
              infoType={this.props.data.type}
              date={this.props.data.date}
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
