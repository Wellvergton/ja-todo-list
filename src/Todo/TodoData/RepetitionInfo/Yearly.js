import React from "react";

function Yearly(props) {
  let date = new Date();
  date.setMonth(props.date.month);
  date.setDate(props.date.day);
  date = date.toLocaleDateString("en-US", { day: "2-digit", month: "long" });

  return (
    <p className="font-weight-bold">{date}</p>
  );
}

export default Yearly;
