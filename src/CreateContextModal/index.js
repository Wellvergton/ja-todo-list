import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addContext, isContextDuplicate } from "../contextManager";

export default class CreateContextModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newContextName: "", nameIsInvalid: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleClose() {
    this.setState({ nameIsInvalid: false });
    this.props.onClose();
  }

  handleSave() {
    addContext(this.state.newContextName);
    this.props.onSave(this.state.newContextName);
    this.handleClose();
  }

  handleInput(event) {
    const value = event.target.value;

    this.setState({
      newContextName: value.toLowerCase(),
      nameIsInvalid: isContextDuplicate(value),
    });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleClose}
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
                isInvalid={this.state.nameIsInvalid}
                placeholder="Enter the new context name"
                onChange={this.handleInput}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    event.preventDefault();
                    this.handleSave();
                  }
                }}
                autoFocus
                required
              />
              <Form.Text className="text-danger">
                {this.state.nameIsInvalid ? "Context already exists" : ""}
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={this.handleSave}
            disabled={
              this.state.nameIsInvalid || this.state.newContextName === ""
            }
            aria-disabled={
              this.state.nameIsInvalid || this.state.newContextName === ""
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
