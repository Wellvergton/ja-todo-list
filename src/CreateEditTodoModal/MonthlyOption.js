import React, { useState } from "react";

import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function MonthlyOptions(props) {
  const [selectedDay, setSelectedDay] = useState(props.selectedDay);
  let days = [];

  for (let day = 1; day < 32; day++) {
    days.push(
      <option value={day} key={day} onClick={() => setSelectedDay(day)}>
        {day}
      </option>
    );
  }

  return (
    <>
      <Row>
        <Col xs={6}>
          <Form.Group controlId="selectDayOfTheMonth">
            <Form.Label>Day</Form.Label>
            <Form.Control
              as="select"
              className="mt-1"
              name="day"
              defaultValue={props.selectedDay}
              custom
            >
              {days}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      {[29, 30, 31].includes(selectedDay) && (
        <Alert variant="info">
          In months that doesn't includes the days 29, 30 or 31 the date will be
          changed to the last day of the month
        </Alert>
      )}
    </>
  );
}
