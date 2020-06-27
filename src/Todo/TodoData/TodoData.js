import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Octicon, { Pencil } from "@primer/octicons-react";
import Weekly from "./RepetitionInfo/Weekly";
import Monthly from "./RepetitionInfo/Monthly";
import Yearly from "./RepetitionInfo/Yearly";

function TodoData(props) {
  let dataTypes = {
    daily: <p className="font-weight-bold">Everyday</p>,
    weekly: <Weekly days={props.date} />,
    monthly: <Monthly day={props.date.day} />,
    yearly: <Yearly date={props.date} />,
    someday: <p className="font-weight-bold">Someday</p>,
  };

  return (
    <>
      <p className="card-text">{props.description}</p>
      <Container>
        <Row className="align-items-center">
          <Col className="pl-0">{dataTypes[props.infoType]}</Col>
          <Col xs={2} className="d-flex flex-row-reverse pr-0">
            <Button variant="light" size="sm" onClick={props.onEdit}>
              <Octicon icon={Pencil} />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TodoData;
