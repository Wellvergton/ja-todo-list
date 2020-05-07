import React from "react";
import "./TodoData.scss";

import Octicon, { Check } from "@primer/octicons-react";

function TodoData(props) {
  let daysOfTheWeek = ["S", "T", "Q", "Q", "S", "S", "D"];
  let daysButtons = daysOfTheWeek.map((day, key) => {
    return (
      <label
        key={day + (key + 1)}
        className="btn btn-sm btn-light mx-auto font-weight-bold"
      >
        <input type="checkbox" /> {day}
      </label>
    );
  });

  return (
    <div className="TodoData">
      <p className="px-2">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
        tempore pariatur commodi minus neque ipsum porro aliquid
      </p>

      <div className="container mb-3">
        <div className="row align-items-center">
          <div className="col-2 px-0">
            <div className="btn-group-toggle d-flex justify-content-center">
              <label className="btn btn-sm btn-light">
                <input type="checkbox" id="repeat" />
                <Octicon icon={Check} />
              </label>
            </div>
          </div>

          <label htmlFor="repeat">Repetir:</label>
        </div>
      </div>

      <div
        className="btn-group-toggle d-flex justify-content-center px-1 mb-3"
        role="group"
        aria-label="Dias da semana"
      >
        {daysButtons}
      </div>
    </div>
  );
}

export default TodoData;
