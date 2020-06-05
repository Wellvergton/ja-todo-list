import React from "react";
import "./Todo.scss";

import Main from "./Main/Main";
import TodoData from "./TodoData/TodoData";
import InfoToggler from "./InfoToggler/InfoToggler";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.conclude = this.conclude.bind(this);
  }

  hideTodoBody(event) {
    let todoBody = event.target.parentNode.previousElementSibling;

    if (todoBody.dataset.active === "false") {
      todoBody.style.height = `${todoBody.scrollHeight}px`;
      todoBody.dataset.active = "true";
    } else {
      todoBody.style.height = "0";
      todoBody.dataset.active = "false";
    }
  }

  fadeOutTodo(element) {
    let todoElement = (function findTodoElement(element) {
      if (element.classList.contains("Todo")) {
        return element;
      }

      return findTodoElement(element.parentElement);
    })(element);

    return new Promise((resolve, reject) => {
      todoElement.animate(
        [
          { height: `${todoElement.scrollHeight}px` },
          { height: "0px", opacity: "0", margin: "0" },
        ],
        { duration: 100 }
      );

      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  async delete(event) {
    await this.fadeOutTodo(event.target);
    this.props.onDelete(this.props.data.title);
  }

  async conclude(event) {
    await this.fadeOutTodo(event.target);
    this.props.onConclude(this.props.data.title);
  }

  render() {
    let colors = {
      concluded: "bg-secondary",
      deleted: "bg-dark",
      delayed: "bg-danger",
      today: "bg-warning",
      someday: "bg-success",
      pending: "bg-primary",
    };
    let cardColor = colors[this.props.data.status];
    let textColor = cardColor === "bg-warning" ? "" : "text-white";

    return (
      <div className={"Todo my-2"}>
        <div className={`card ${cardColor} ${textColor}`}>
          <div className="card-header py-1">
            <Main
              title={this.props.data.title}
              status={this.props.data.status}
              onClickInDelete={this.delete}
              onClickInCheck={this.conclude}
            />
          </div>

          <div className="card-body py-0" data-active="false">
            <TodoData
              description={this.props.data.description}
              infoType={this.props.data.type}
              date={this.props.data.date}
            />
          </div>

          <div className="card-footer p-0">
            <InfoToggler
              textColor={`${textColor}`}
              onClick={this.hideTodoBody}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;