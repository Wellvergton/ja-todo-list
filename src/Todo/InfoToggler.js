import React from "react";
import "./InfoToggler.scss";
import Button from "react-bootstrap/Button";
import Octicon, { ChevronDown } from "@primer/octicons-react";

function InfoToggler(props) {
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
      onClick={handleClick}
    >
      <Octicon icon={ChevronDown} />
    </Button>
  );
}

export default InfoToggler;
