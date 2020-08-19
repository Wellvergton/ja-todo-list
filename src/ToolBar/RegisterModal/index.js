import React from "react";

import Modal from "react-bootstrap/Modal";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function SignInModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-capitalize">
          {props.registerType}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.registerType === "sign in" ? <SignInForm /> : <SignUpForm />}
      </Modal.Body>
      <Modal.Footer>
        <ToggleButtonGroup
          type="radio"
          name="sign"
          aria-label="Change register type"
          defaultValue={props.registerType}
        >
          <ToggleButton
            variant="outline-success"
            type="radio"
            value="sign in"
            key="sign in"
            onClick={() => props.handleChange("sign in")}
          >
            Sign in
          </ToggleButton>
          <ToggleButton
            variant="outline-success"
            type="radio"
            value="sign up"
            key="sign up"
            onClick={() => props.handleChange("sign up")}
          >
            Sign up
          </ToggleButton>
        </ToggleButtonGroup>
      </Modal.Footer>
    </Modal>
  );
}
