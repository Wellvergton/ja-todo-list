import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import WeeklyOption from "./WeeklyOption";
import MonthlyOption from "./MonthlyOption";
import YearlyOptions from "./YearlyOption";

class CreateTodoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      formData: {
        name: "",
        context: "general",
        description: "",
        type: "daily",
        day: 1,
        month: 0,
      },
      nameIsBlank: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.isNameBlank = this.isNameBlank.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const formDataCopy = this.state.formData;

    if (name === "weekly") {
      if (!Array.isArray(formDataCopy.day)) {
        formDataCopy.day = [];
      }

      if (!formDataCopy.day.includes(value)) {
        formDataCopy.day.push(value);
      } else {
        formDataCopy.day = formDataCopy.day.filter((day) => day !== value);
      }
    } else {
      formDataCopy[name] = value;
    }

    this.setState({ formData: formDataCopy });
  }

  handleClose() {
    this.props.onClose();
    this.setState({ show: false });
  }

  handleSave() {
    this.props.onSave(this.state.formData);
    this.handleClose();
  }

  isNameBlank() {
    this.setState({
      nameIsBlank: this.state.formData.name === "" ? true : false,
    });
  }

  render() {
    const typesOptions = {
      weekly: <WeeklyOption />,
      monthly: <MonthlyOption />,
      yearly: <YearlyOptions />,
    };

    const contexts = this.props.contexts
      .filter((context) => context !== "deleted")
      .map((context) => {
        return (
          <option value={context} key={context}>
            {context.replace(context[0], context[0].toUpperCase())}
          </option>
        );
      });

    return (
      <Modal show={this.props.show} animation={false} centered={true}>
        <Modal.Header>
          <Modal.Title>Create a new Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onChange={this.handleChange}>
            <Form.Group controlId="newTodoName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="mt-1"
                name="name"
                isInvalid={this.state.nameIsBlank}
                onBlur={this.isNameBlank}
              />
              <Form.Text className="text-danger">
                {this.state.nameIsBlank ? "A name is required" : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="newTodoContext">
              <Form.Label>Context</Form.Label>
              <Form.Control as="select" className="mt-1" name="context" custom>
                {contexts}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="newTodoType">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" className="mt-1" name="type" custom>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="someday">Someday</option>
              </Form.Control>
            </Form.Group>
            {typesOptions[this.state.formData.type] || ""}
            <Form.Group controlId="newTodoDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                className="mt-1"
                name="description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={this.state.formData.name === ""}
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
