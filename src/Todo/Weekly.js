import React from "react";

export default function Weekly(props) {
  let daysIndicators = [];
  const daysOfTheWeek = {
    "0": "sun",
    "1": "mon",
    "2": "tue",
    "3": "wed",
    "4": "thu",
    "5": "fri",
    "6": "sat",
  };

  for (let day of props.days) {
    daysIndicators.push(
      <span className="font-weight-bold text-capitalize" key={day}>
        {`${daysOfTheWeek[day]} `}
      </span>
    );
  }

  return (
    <div>
      <p>{daysIndicators}</p>
    </div>
  );
}
