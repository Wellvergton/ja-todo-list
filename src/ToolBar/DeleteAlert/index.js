import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteAlert(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      animation={false}
      centered
      backdrop="static"
      aria-labelledby="delete-context-alert"
    >
      <span id="delete-context-alert" className="d-none">
        Delete context alert
      </span>
      <Modal.Body className="p-0">
        <Alert variant="warning" className="m-0">
          This action will delete this context and all related todos.
          <hr />
          <div>
            <Button variant="success" className="mr-2" onClick={props.onHide}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                props.onDelete();
                props.onHide();
              }}
            >
              Confirm
            </Button>
          </div>
        </Alert>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteAlert;
