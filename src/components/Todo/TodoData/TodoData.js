import React from "react";
import "./TodoData.scss";

import Octicon, { Check, Dash } from "@primer/octicons-react";

function TodoData(props) {
  let daysOfTheWeek = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
  let daysButtons = daysOfTheWeek.map((day, key) => {
    return (
      <label
        key={day + (key + 1)}
        className="btn btn-sm btn-light mx-auto font-weight-bold"
      >
        <input type="checkbox" /> {day[0].toUpperCase()}
      </label>
    );
  });

  return (
    <div className="TodoData">
      <p className="card-text">{props.description}</p>

      <div className="d-flex align-items-center mb-3">
        <div className="px-0">
          <div className="btn-group-toggle d-flex justify-content-center mr-2">
            <label className="btn btn-sm btn-light">
              <input type="checkbox" id="repeat" />
              <Octicon icon={props.days.length ? Check : Dash} />
            </label>
          </div>
        </div>

        <label htmlFor="repeat">Repetir</label>
      </div>

      {
        (props.days.length > 0) &&
          <div
            className="btn-group-toggle d-flex mb-3"
            role="group"
            aria-label="Dias da semana"
          >
            {daysButtons}
          </div>
        
      }
    </div>
  );
}

export default TodoData;
