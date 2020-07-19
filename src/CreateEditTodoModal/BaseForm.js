import React from "react";

import Form from "react-bootstrap/Form";

import MonthlyOption from "./MonthlyOption";
import WeeklyOption from "./WeeklyOption";
import YearlyOptions from "./YearlyOption";

export default class BaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleIsBlank: false,
      todoIsDuplicate: false,
      noDateIsSelected: false,
    };
    this.validateForm = this.validateForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  validateForm() {
    const date = this.props.formData.date;
    this.setState({
      todoIsDuplicate: this.props.checkDuplicate(),
      noDateIsSelected: Array.isArray(date) && date.length === 0,
      titleIsBlank: this.props.formData.title === "",
    });
  }

  onChange(event) {
    this.props.handleChange(event);
    this.validateForm();
  }

  render() {
    const typeOptions = {
      weekly: <WeeklyOption selectedDays={this.props.formData.date} />,
      monthly: <MonthlyOption selectedDay={this.props.formData.date.day} />,
      yearly: <YearlyOptions selectedDate={this.props.formData.date} />,
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
      <Form onChange={this.onChange}>
        <Form.Group controlId="newTodoName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="mt-1"
            name="title"
            isInvalid={this.state.titleIsBlank}
            onBlur={this.validateForm}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault();
              }
            }}
            defaultValue={this.props.formData.title}
            autoFocus
          />
          <Form.Text className="text-danger">
            {this.state.titleIsBlank ? "A name is required" : ""}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="newTodoContext">
          <Form.Label>Context</Form.Label>
          <Form.Control
            as="select"
            className="mt-1"
            name="context"
            defaultValue={this.props.formData.context}
            custom
          >
            {contexts}
          </Form.Control>
          <Form.Text className="text-danger">
            {this.state.todoIsDuplicate
              ? "There is already a task with the same name in the same context"
              : ""}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="newTodoType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            className="mt-1"
            name="type"
            defaultValue={this.props.formData.type}
            custom
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="someday">Someday</option>
          </Form.Control>
        </Form.Group>
        {typeOptions[this.props.formData.type] || ""}
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
    );
  }
}
