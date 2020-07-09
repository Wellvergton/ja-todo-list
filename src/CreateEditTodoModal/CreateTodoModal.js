import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BaseForm from "./BaseForm";
import { isTodoDuplicatedOn, addTodo } from "../todoManager";

export default class CreateTodoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        context:
          props.currentContext === "deleted" ? "general" : props.currentContext,
        description: "",
        type: "daily",
        date: {},
      },
      formIsInvalid: true,
    };
    this.handleSave = this.handleSave.bind(this);
    this.isTodoDuplicated = this.isTodoDuplicated.bind(this);
    this.validateInfo = this.validateInfo.bind(this);
    this.setDateFormat = this.setDateFormat.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSave() {
    addTodo(this.state.formData);
    this.props.onClose();
  }

  isTodoDuplicated() {
    return isTodoDuplicatedOn("create", this.state.formData);
  }

  validateInfo() {
    this.setState({
      formIsInvalid:
        this.state.formData.title === "" ||
        this.isTodoDuplicated() ||
        this.state.formData.date.length === 0,
    });
  }

  setDateFormat(type) {
    let format;

    switch (type) {
      case "weekly":
        format = [];
        break;
      case "monthly":
        format = { day: 1 };
        break;
      case "yearly":
        format = { day: 1, month: 0 };
        break;
      default:
        format = {};
        break;
    }

    return format;
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const formDataCopy = this.state.formData;

    if (name === "type") {
      formDataCopy.date = this.setDateFormat(value);
    }

    if (name === "weekly") {
      if (!formDataCopy.date.includes(parseInt(value))) {
        formDataCopy.date.push(parseInt(value));
      } else {
        formDataCopy.date = formDataCopy.date.filter(
          (day) => day !== parseInt(value)
        );
      }
    } else if (name === "day" || name === "month") {
      formDataCopy.date[name] = parseInt(value);
    } else {
      formDataCopy[name] = value;
    }

    this.setState({ formData: formDataCopy });
    this.validateInfo();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        animation={false}
        centered={true}
        onHide={this.props.onClose}
        backdrop="static"
        aria-labelledby="create-todo-modal-title"
      >
        <Modal.Header>
          <Modal.Title id="create-todo-modal-title">
            Create a new Todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BaseForm
            formData={this.state.formData}
            contexts={this.props.contexts}
            handleChange={this.handleChange}
            checkDuplicate={this.isTodoDuplicated}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={this.state.formIsInvalid}
            onClick={this.handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
