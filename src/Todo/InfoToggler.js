import React from "react";
import "./InfoToggler.scss";
import Button from "react-bootstrap/Button";
import Octicon, { ChevronDown } from "@primer/octicons-react";

export default function InfoToggler(props) {
  function animateChevron(chevronElement) {
    if (chevronElement.style.rotate === "") {
      chevronElement.style.rotate = "180deg";
    } else {
      chevronElement.style.rotate = "";
    }
  }

  function handleClick(event) {
    props.onClick();
    animateChevron(event.target.children[0]);
  }

  return (
    <Button
      className={`InfoToggler text-${props.textColor} p-0`}
      variant={props.bgColor}
      block
      aria-label="Show or Hide todo info"
      onClick={handleClick}
    >
      <Octicon icon={ChevronDown} />
    </Button>
  );
}
