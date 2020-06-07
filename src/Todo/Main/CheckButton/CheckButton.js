import React from "react";
import Button from "react-bootstrap/Button";

function CheckButton(props) {
  function handleClick(event) {
    if (props.status !== "deleted") {
      props.onClick(event);
      if (props.status !== "delayed") {
        event.target.classList.toggle("disabled");
      }
    }
  }

  return (
    <Button
      size="sm"
      variant="light"
      className={`text-dark ${
        props.status === "concluded" || props.status === "deleted"
          ? "disabled"
          : ""
      }`}
      onClick={handleClick}
    >
      {props.children}
    </Button>
  );
}

export default CheckButton;
