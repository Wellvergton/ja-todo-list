import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

class CreateContextModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newContextName: "", nameIsInvalid: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleClose() {
    this.props.onClose();
    this.setState({ nameIsInvalid: false });
  }

  handleSave() {
    this.props.onSave(this.state.newContextName);
    this.handleClose();
  }

  handleInput(event) {
    const value = event.target.value;
    const contexts = this.props.contexts;

    this.setState({ newContextName: value.toLowerCase() });

    contexts.includes(value.toLowerCase())
      ? this.setState({ nameIsInvalid: true })
      : this.setState({ nameIsInvalid: false });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleClose}
        backdrop="static"
        animation={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Create a new context</Modal.Title>
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
                autoFocus
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
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateContextModal;
