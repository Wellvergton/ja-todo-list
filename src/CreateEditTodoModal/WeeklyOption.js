import React from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

export default function WeeklyOption(props) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const options = [];

  for (let index in days) {
    options.push(
      <ToggleButton
        type="checkbox"
        variant="outline-info"
        value={parseInt(index)}
        key={index}
      >
        <span className="text-capitalize">{days[index].slice(0, 3)}</span>
      </ToggleButton>
    );
  }

  return (
    <>
      <Form.Group>
        <Form.Label className="d-block">Day(s)</Form.Label>
        <ToggleButtonGroup
          type="checkbox"
          name="weekly"
          className="mt-1 d-sm-none"
          defaultValue={props.selectedDays}
          vertical
        >
          {options}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          type="checkbox"
          name="weekly"
          className="mt-1 d-none d-sm-block"
          defaultValue={props.selectedDays}
        >
          {options}
        </ToggleButtonGroup>
      </Form.Group>
      {(!Array.isArray(props.selectedDays) ||
        props.selectedDays.length === 0) && (
        <Alert variant="warning">Select at least one day</Alert>
      )}
    </>
  );
}
