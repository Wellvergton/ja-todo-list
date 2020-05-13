import React from "react";

function Yearly(props) {
  let date = new Date();
  date.setDate(props.date.day);
  date.setMonth(props.date.month);
  date = date.toLocaleDateString("en-US", { day: "2-digit", month: "long" });

  return (
    <p>{date}</p>
  );
}

export default Yearly;
