import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SignUpForm() {
  return (
    <Form>
      <Form.Group controlId="formUserName">
        <Form.Label>Name</Form.Label>
        <Form.Control placeHolder="Your Name" />
      </Form.Group>
      <Form.Group controlId="formUserEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="exemple@email.com" />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={(event) => event.preventDefault()}
      >
        Submit
      </Button>
    </Form>
  );
}
