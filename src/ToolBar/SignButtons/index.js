import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import RegisterModal from "../RegisterModal";

import { SessionContext } from "../../SessionContext";

export default function SignButtons() {
  const [signModalIsVisible, setSignModalIsVisible] = useState(false);
  const [signModalType, setSignModalType] = useState("sign in");

  async function logOut(onOKCallback) {
    const URL = "http://localhost:3001/logout/";
    const requestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      cache: "default",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(URL, requestInit);

    if (response.status === 200) {
      onOKCallback(!response.ok);
    }
  }

  return (
    <>
      <SessionContext.Consumer>
        {({ isSigned, setIsSigned }) =>
          isSigned ? (
            <Button variant="danger" onClick={() => logOut(setIsSigned)}>
              Sign out
            </Button>
          ) : (
            <ButtonGroup aria-label="Register">
              <Button
                variant="outline-light"
                onClick={() => {
                  setSignModalType("sign in");
                  setSignModalIsVisible(true);
                }}
              >
                <span className="font-weight-bold">Sign in</span>
              </Button>
              <Button
                variant="outline-light"
                onClick={() => {
                  setSignModalType("sign up");
                  setSignModalIsVisible(true);
                }}
              >
                <span className="font-weight-bold">Sign up</span>
              </Button>
            </ButtonGroup>
          )
        }
      </SessionContext.Consumer>
      <RegisterModal
        show={signModalIsVisible}
        handleClose={() => setSignModalIsVisible(false)}
        handleChange={setSignModalType}
        registerType={signModalType}
      />
    </>
  );
}
