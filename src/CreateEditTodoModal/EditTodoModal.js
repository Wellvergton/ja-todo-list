import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BaseForm from "./BaseForm";
import { editTodo } from "../todoManager";

class CreateTodoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: Object.assign({}, props.data),
      formIsInvalid: false,
    };
    this.originalContext = props.data.context;
    this.originalTitle = props.data.title;
    this.form = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.setDateFormat = this.setDateFormat.bind(this);
    this.validateInfo = this.validateInfo.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.isTodoDuplicated = this.isTodoDuplicated.bind(this);
  }

  handleClose() {
    this.props.onClose();
  }

  handleSave() {
    this.handleClose();
    editTodo(this.state.formData);
  }

  isTodoDuplicated() {
    const title = this.state.formData.title;
    const context = this.state.formData.context;
    return (
      this.originalContext !== context &&
      this.props.todos.some((todo) => {
        return todo.title === title && todo.context === context;
      })
    );
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
        backdrop="static"
        aria-labelledby="edit-todo-modal-title"
      >
        <Modal.Header>
          <Modal.Title id="edit-todo-modal-title">
            Create a new Todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BaseForm
            ref={this.form}
            formData={this.state.formData}
            contexts={this.props.contexts}
            handleChange={this.handleChange}
            checkDuplicate={this.isTodoDuplicated}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
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

export default CreateTodoModal;
