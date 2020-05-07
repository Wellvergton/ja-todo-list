import React from "react";
import Octicon, { ChevronDown } from "@primer/octicons-react";

function InfoToggler(props) {
  return (
    <button className={`btn btn-block btn-${props.bgColor} pt-0`}>
      <Octicon icon={ChevronDown} />
    </button>
  );
}

export default InfoToggler;
