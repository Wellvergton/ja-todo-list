import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function YearlyOptions() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [];
  let months = [];
  let [selectedMonth, setSelectedMonth] = useState(0);
  let amountOfDays;

  if ([0, 2, 4, 6, 7, 9, 11].includes(selectedMonth)) {
    amountOfDays = 31;
  } else if ([3, 5, 8, 10].includes(selectedMonth)) {
    amountOfDays = 30;
  } else {
    amountOfDays = 29;
  }

  for (let day = 1; day < amountOfDays + 1; day++) {
    days.push(
      <option value={day} key={day}>
        {day}
      </option>
    );
  }
  for (let month = 0; month < 12; month++) {
    months.push(
      <option value={month} key={month} onClick={() => setSelectedMonth(month)}>
        {monthNames[month]}
      </option>
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
