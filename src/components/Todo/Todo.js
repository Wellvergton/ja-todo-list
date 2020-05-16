import React from "react";
import "./Todo.scss";

import Main from "./Main/Main";
import TodoData from "./TodoData/TodoData";
import InfoToggler from "./InfoToggler/InfoToggler";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.delete = this.delete.bind(this);
    this.conclude = this.conclude.bind(this);
    this.isDelayed = this.isDelayed.bind(this);
  }

  hideData(event) {
    let todoData = event.target.parentNode.previousElementSibling;

    if (todoData.dataset.active === "false") {
      todoData.style.height = `${todoData.scrollHeight}px`;
      todoData.dataset.active = "true";
    } else {
      todoData.style.height = "0";
      todoData.dataset.active = "false";
    }
  }

  isDelayed() {
    let today = new Date();

    if (
      (this.state.type === "yearly" &&
        today.getMonth() > this.state.date.month &&
        today.getDate() > this.state.date.day) ||
      (this.state.type === "monthly" && today.getDate() > this.state.date.day)
    ) {
      return true;
    }
  }

  delete(event) {
    let todo = (function recursive(el) {
      if (el.parentElement.classList.contains("Todo")) return el.parentElement;

      return recursive(el.parentElement);
    })(event.target);

    todo.animate(
      [
        { height: `${todo.scrollHeight}px` },
        { height: "0px", opacity: "0", margin: "0" },
      ],
      { duration: 100 }
    );

    setTimeout(() => this.setState({ status: "deleted" }), 100);
  }

  conclude() {
    if (this.state.status === "delayed" || this.state.status === "concluded") {
      this.setState({ status: "pending" });
    } else {
      this.setState({ status: "concluded" });
    }
  }

  componentDidMount() {
    if (this.isDelayed()) this.setState({ status: "delayed" });
  }

  render() {
    let notPendingColors = {
      concluded: "bg-secondary",
      deleted: "bg-dark",
      delayed: "bg-danger",
      today: "bg-warning",
    };
    let pendingColors = {
      soon: "bg-primary",
      someday: "bg-success",
    };
    let cardColor = "";

    if (this.state.status !== "pending") {
      cardColor = notPendingColors[this.state.status];
    } else {
      if (pendingColors[this.state.type]) {
        cardColor = pendingColors[this.state.type];
      } else {
        cardColor = pendingColors["soon"];
      }
    }

    let textColor = cardColor === "bg-warning" ? "" : "text-white";

    return (
      <div className={"Todo my-2"}>
        <div className={`card ${cardColor} ${textColor}`}>
          <div className="card-header py-1">
            <Main
              title={this.state.title}
              status={this.state.status}
              onClickInDelete={this.delete}
              onClickInCheck={this.conclude}
            />
          </div>

          <div className="card-body py-0" data-active="false">
            <TodoData
              description={this.state.description}
              infoType={this.state.type}
              date={this.state.date}
            />
          </div>

          <div className="card-footer p-0">
            <InfoToggler textColor={`${textColor}`} onClick={this.hideData} />
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
