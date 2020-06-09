import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function YearlyOptions(props) {
  let days = [];
  let months = [];

  for (let day = 1; day < 32; day++) {
    days.push(
      <option value={day} key={day}>{day}</option>
    );
  }
  for (let month = 0; month < 12; month++) {
    months.push(
      <option value={month} key={month}>{month + 1}</option>
    );
  }

  return (
    <Row>
      <Col>
        <Form.Group controlId="selectDayOfTheMonth">
          <Form.Label>Day</Form.Label>
          <Form.Control as="select" className="mt-1" name="day" custom>
            {days}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="selectMonth">
          <Form.Label>Month</Form.Label>
          <Form.Control as="select" className="mt-1" name="month" custom>
            {months}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default YearlyOptions;
