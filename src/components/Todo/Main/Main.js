import React from "react";
import "./Main.scss";

import Octicon, { Check, Trashcan } from "@primer/octicons-react";
import CheckButton from "./CheckButton/CheckButton";

function Main(props) {
  return (
    <div className="Main">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-1 px-0 d-flex justify-content-center">
            <CheckButton
              status={props.status}
              onClick={props.onClickInCheck}
            >
              <Octicon icon={Check} />
            </CheckButton>
          </div>
          <div className="col-10">
            <p
              className={`text-left text-truncate ${
                props.status === "concluded" ? "text-deleted" : ""
              }`}
            >
              {props.title}
            </p>
          </div>
          <div className="col-1 px-0 d-flex justify-content-center">
            <button
              className="btn btn-sm btn-light"
              onClick={props.onClickInDelete}
            >
              <Octicon icon={Trashcan} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
