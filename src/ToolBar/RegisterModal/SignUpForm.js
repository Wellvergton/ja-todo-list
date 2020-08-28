import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SignUpForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  async function submit() {
    const URL = "http://localhost:3001/users/";
    const requestInit = {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    };

    const response = await fetch(URL, requestInit);

    if (response.status === 200) {
      props.onSuccess();
    } else {
      const responseJson = await response.json();

      setResponseMessage(responseJson.error);
    }
  }

  function formIsInvalid() {
    return (
      password !== confirmPassword ||
      [name, email, password, confirmPassword].includes("")
    );
  }

  return (
    <Form>
      <Form.Group controlId="formUserName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="Your Name"
          onInput={(event) => setName(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formUserEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="exemple@email.com"
          onInput={(event) => setEmail(event.target.value)}
        />
        <Form.Text className="text-danger">
          {responseMessage === "User already exists" ? responseMessage : ""}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onInput={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          onInput={(event) => setConfirmPassword(event.target.value)}
        />
        <Form.Text className="text-danger">
          {password !== confirmPassword ? "Passwords does not match" : ""}
        </Form.Text>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={formIsInvalid()}
        onClick={async (event) => {
          event.preventDefault();
          submit();
        }}
      >
        Submit
      </Button>
    </Form>
  );
}
