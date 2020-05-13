import React from "react";

function WeeklyData(props) {
  let days = [];

  for (let day in props.days) {
    if (props.days[day] === true) {
      days.push(
        <span className="font-weight-bold text-capitalize" key={day}>
          {`${day} `}
        </span>
      );
    }
  }

  return (
    <div>
      <p>{days}</p>
    </div>
  );
}

export default WeeklyData;
