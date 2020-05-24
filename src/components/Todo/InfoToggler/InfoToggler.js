import React from "react";
import "./InfoToggler.scss";

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
    props.onClick(event);
    animateChevron(event.target.children[0]);
  }

  return (
    <button
      className={`InfoToggler btn btn-block ${props.textColor} p-0`}
      onClick={handleClick}
    >
      <Octicon icon={ChevronDown} />
    </button>
  );
}

export default InfoToggler;
