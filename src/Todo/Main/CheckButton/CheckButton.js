import React from "react";

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
    <button
      className={`btn btn-sm btn-light ${
        props.status === "concluded" || props.status === "deleted"
          ? "disabled"
          : ""
      }`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}

export default CheckButton;
