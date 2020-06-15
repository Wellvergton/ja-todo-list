import React from "react";

function Yearly(props) {
  let date = new Date();
  const baseYear =
    props.date.month > date.getMonth()
      ? date.getFullYear()
      : date.getFullYear() + 1;
  const isLeapYear =
    (baseYear % 4 === 0 && baseYear % 100 !== 0) || baseYear % 400 === 0;

  date.setMonth(props.date.month);
  if (!isLeapYear && props.date.month === 1 && props.date.day === 29) {
    date.setDate(28);
  } else {
    date.setDate(props.date.day);
  }
  date = date.toLocaleDateString("en-US", { day: "2-digit", month: "long" });

  return <p className="font-weight-bold">{date}</p>;
}

export default Yearly;
