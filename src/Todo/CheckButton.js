import React from "react";
import Button from "react-bootstrap/Button";

export default function CheckButton(props) {
  function handleClick() {
    if (props.status !== "deleted") {
      props.onClick("onConclude");
    }
  }

  return (
    <Button
      size="sm"
      variant="light"
      className={`text-dark ${props.status === "deleted" ? "disabled" : ""}`}
      aria-label="Conclude todo"
      onClick={handleClick}
    >
      {props.children}
    </Button>
  );
}
