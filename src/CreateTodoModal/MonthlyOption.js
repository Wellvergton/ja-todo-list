import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function MonthlyOptions() {
  let days = [];

  for (let day = 1; day < 32; day++) {
    days.push(
      <option value={day} key={day}>{day}</option>
    );
  }

  return (
    <Row>
      <Col xs={6}>
        <Form.Group controlId="selectDayOfTheMonth">
          <Form.Label>Day</Form.Label>
          <Form.Control as="select" className="mt-1" name="day" custom>
            {days}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default MonthlyOptions;
