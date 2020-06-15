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
      formData: {
        title: "",
        context: "general",
        description: "",
        type: "daily",
        date: {},
      },
      titleIsBlank: false,
      formIsInvalid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setDateFormat = this.setDateFormat.bind(this);
    this.isTitleBlank = this.isTitleBlank.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClose() {
    this.props.onClose();
  }

  handleSave() {
    this.handleClose();
    this.props.onSave(this.state.formData);
  }

  isTitleBlank() {
    this.setState({
      titleIsBlank: this.state.formData.title === "",
    });
  }

  isFormInvalid() {
    const type = this.state.formData.type;
    const date = this.state.formData.date;
    const title = this.state.formData.title;

    if ((type === "weekly" && date.length === 0) || title === "") {
      this.setState({ formIsInvalid: true });
    } else {
      this.setState({ formIsInvalid: false });
    }
  }

  setDateFormat(type) {
    let format;

    switch (type) {
      case "weekly":
        format = [];
        break;
      case "monthly":
        format = { day: 1};
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
    this.isTitleBlank();
    this.isFormInvalid();
  }

  render() {
    const typeOptions = {
      weekly: <WeeklyOption selectedDays={this.state.formData.date} />,
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
                name="title"
                isInvalid={this.state.titleIsBlank}
              />
              <Form.Text className="text-danger">
                {this.state.titleIsBlank ? "A name is required" : ""}
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
            {typeOptions[this.state.formData.type] || ""}
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
