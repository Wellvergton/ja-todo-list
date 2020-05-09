import React from "react";

function CheckButton(props) {
  function handleClick(event) {
    props.onClick();
    event.target.classList.toggle("disabled");
  }

  return (
    <button
      className={`btn btn-sm btn-light ${props.isChecked ? "disabled" : ""}`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}

export default CheckButton;
