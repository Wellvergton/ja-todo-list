import React from "react";
import "./TodoData.scss";
import Weekly from "./RepetitionInfo/Weekly";
import Monthly from "./RepetitionInfo/Monthly";
import Yearly from "./RepetitionInfo/Yearly";

function TodoData(props) {
  let dataTypes = {
    daily: <p className="font-weight-bold">Everyday</p>,
    weekly: <Weekly days={props.date} />,
    monthly: <Monthly day={props.date.day} />,
    yearly: <Yearly date={props.date} />,
    someday: <p className="font-weight-bold">Someday</p>,
  };

  return (
    <div className="TodoData">
      <p className="card-text">{props.description}</p>
      {dataTypes[props.infoType]}
    </div>
  );
}

export default TodoData;
