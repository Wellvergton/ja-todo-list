import React from "react";
import Form from "react-bootstrap/Form";
import { updateContextName } from "../contextManager";
import { getTodosBy, editTodo } from "../todoManager";

export default class EditableTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleBlur() {
    if (this.state.value !== "") {
      getTodosBy("context", this.props.defaultValue).forEach((todo) => {
        todo.context = this.state.value;
        editTodo(todo);
      });
      updateContextName(this.props.defaultValue, this.state.value);
      this.props.onBlur(this.state.value);
    } else {
      this.setState({ value: this.props.defaultValue });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.setState({ value: this.props.defaultValue });
    }
  }

  render() {
    const isReadOnly =
      this.props.defaultValue === "general" ||
      this.props.defaultValue === "deleted";

    return (
      <Form.Group className="mb-0">
        <Form.Label srOnly>Context title, click to edit</Form.Label>
        <Form.Control
          type="text"
          htmlSize={7}
          value={this.state.value}
          plaintext={isReadOnly}
          readOnly={isReadOnly}
          className="bg-dark text-center text-capitalize text-light border-0"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </Form.Group>
    );
  }
}
