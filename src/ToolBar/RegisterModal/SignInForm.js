import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { SessionContext } from "../../SessionContext";

export default function SignInForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(onOKCallback) {
    const URL = "http://localhost:3001/login/";
    const requestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "default",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(URL, requestInit);

    if (response.status === 200) {
      props.onSuccess();
      onOKCallback(response.ok);
    } else {
      const responseJson = await response.json();

      setResponseMessage(responseJson.error);
    }
  }

  function formIsInvalid() {
    return [email, password].includes("");
  }

  return (
    <SessionContext.Consumer>
      {({ isSigned, setIsSigned }) => (
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="exemple@email.com"
              onInput={(event) => setEmail(event.target.value)}
            />
            <Form.Text className="text-danger">
              {responseMessage === "User not found" ? responseMessage : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onInput={(event) => setPassword(event.target.value)}
            />
            <Form.Text className="text-danger">
              {responseMessage === "Incorrect password" ? responseMessage : ""}
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={formIsInvalid()}
            onClick={(event) => {
              event.preventDefault();
              submit(setIsSigned);
            }}
          >
            Submit
          </Button>
        </Form>
      )}
    </SessionContext.Consumer>
  );
}
