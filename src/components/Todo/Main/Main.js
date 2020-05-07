import React from "react";
import "./Main.scss"

import Octicon, {Check, Trashcan} from "@primer/octicons-react";

function Main() {
  return (
    <div className="Main">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-2 px-0">
            <div className="btn-group-toggle d-flex justify-content-center">
              <label className="btn btn-sm btn-light">
                <input type="checkbox" />
                <Octicon icon={Check} />
              </label>
            </div>
          </div>
          <div className="col-8 px-0">
            <p className="text-left text-truncate">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="col-2 px-0">
            <div className="btn-group-toggle d-flex justify-content-center">
              <label className="btn btn-sm btn-light">
                <input type="checkbox" />
                <Octicon icon={Trashcan} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
