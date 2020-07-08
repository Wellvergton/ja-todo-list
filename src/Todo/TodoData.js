import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Octicon, { Pencil } from "@primer/octicons-react";
import Weekly from "./Weekly";
import Monthly from "./Monthly";
import Yearly from "./Yearly";

export default function TodoData(props) {
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
            <Button
              variant="light"
              size="sm"
              aria-label="Edit todo"
              onClick={props.onEdit}
            >
              <Octicon icon={Pencil} />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
