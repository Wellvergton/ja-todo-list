import React from "react";
import "./InfoToggler.scss";

import Octicon, { ChevronDown } from "@primer/octicons-react";

function InfoToggler(props) {
  function handleClick(event) {
    props.onClick(event);
    if (event.target.children[0].style.rotate === "") {
      event.target.children[0].style.rotate = "180deg";
    } else {
      event.target.children[0].style.rotate = "";
    }
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
