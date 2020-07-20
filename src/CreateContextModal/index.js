import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { addContext, isContextDuplicate } from "../contextManager";

export default function CreateContextModal(props) {
  const [newContextName, setNewContextName] = useState("");
  const [nameIsInvalid, setNameIsInvalid] = useState(false);

  function handleClose() {
    setNameIsInvalid(false);
    props.onClose();
  }

  function handleSave() {
    addContext(newContextName);
    props.onSave(newContextName);
    handleClose();
  }

  function handleInput(event) {
    const value = event.target.value;

    setNewContextName(value.toLowerCase());
    setNameIsInvalid(isContextDuplicate(value));
  }

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      animation={false}
      centered
      aria-labelledby="create-context-modal-title"
    >
      <Modal.Header>
        <Modal.Title id="create-context-modal-title">
          Create a new context
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="createContext">
            <Form.Label>Context name</Form.Label>
            <Form.Control
              className="my-2"
              isInvalid={nameIsInvalid}
              placeholder="Enter the new context name"
              onChange={handleInput}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  handleSave();
                }
              }}
              autoFocus
              required
            />
            <Form.Text className="text-danger">
              {nameIsInvalid ? "Context already exists" : ""}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={nameIsInvalid || newContextName === ""}
          aria-disabled={nameIsInvalid || newContextName === ""}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
