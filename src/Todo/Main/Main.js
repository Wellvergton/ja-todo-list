import React from "react";
import "./Main.scss";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Octicon, { Check, Sync, Trashcan } from "@primer/octicons-react";
import CheckButton from "./CheckButton/CheckButton";

function Main(props) {
  return (
    <div className="Main">
      <Container>
        <Row className="align-items-center">
          <Col className="px-0 d-flex justify-content-center" xs={1}>
            <CheckButton status={props.status} onClick={props.action}>
              <Octicon icon={Check} />
            </CheckButton>
          </Col>
          <Col>
            <p
              className={`text-left text-truncate ${
                props.status === "concluded" ? "text-deleted" : ""
              }`}
            >
              {props.title}
            </p>
          </Col>
          <Col className="px-0 d-flex justify-content-center" xs={1}>
            <Button
              size="sm"
              variant="light"
              onClick={
                props.status !== "deleted"
                  ? () => props.action("delete")
                  : () => props.action("restore")
              }
            >
              <Octicon icon={props.status !== "deleted" ? Trashcan : Sync} />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
