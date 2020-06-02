const today = new Date();

const functions = {
  daily(data) {
    if (
      data.date === "" ||
      (data.date < today.getDay() && data.status === "concluded")
    ) {
      data.date = today.getDay();
      data.status = "today";
    }

    if (data.date === today.getDay() && data.status === "concluded") {
      data.status = "concluded";
    }

    if (data.date < today.getDay() && data.status !== "concluded") {
      data.status = "delayed";
    }

    return data;
  },
};

function setProperStatus(data) {
  if (functions[data.type]) {
    return functions[data.type](data);
  }

  return data;
}

export default setProperStatus;
