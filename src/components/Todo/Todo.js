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
    this.check = this.check.bind(this);
  }

  hideData(event) {
    let todoData = event.target.parentNode.previousElementSibling;

    if (todoData.dataset.active === "false") {
      todoData.style.maxHeight = "500px";
      todoData.style.padding = "1.25rem";
      todoData.dataset.active = "true";
    } else {
      todoData.style.maxHeight = "0";
      todoData.style.padding = "0 1.25rem";
      todoData.dataset.active = "false";
    }
  }

  delete() {
    this.setState({ isDeleted: true });
  }

  check() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    let textColor = this.props.bgColor === "warning" ? "" : "text-white";

    return (
      <div className={`Todo my-2 mr-2 ${this.state.isDeleted ? "d-none" : ""}`}>
        <div className={`card bg-${this.props.bgColor} ${textColor}`}>
          <div className="card-header py-1">
            <Main
              title={this.state.title}
              isChecked={this.state.isChecked}
              onClickInDelete={this.delete}
              onClickInCheck={this.check}
            />
          </div>
          <div className="card-body py-0" data-active="false">
            <TodoData
              description={this.props.data.description}
              days={this.props.data.daysOfTheWeek}
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
