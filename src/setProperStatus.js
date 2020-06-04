const currentDate = new Date();
const currentDay = currentDate.getDay();
const currentDayOfTheWeek = currentDate.getDay();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const currentTime = new Date(currentYear, currentMonth, currentDay).getTime();

const functions = {
  daily(data) {
    const dataBasedDate = new Date(
      currentYear,
      currentMonth,
      data.date.day
    ).getTime();

    if (dataBasedDate === currentTime && data.status !== "concluded") {
      data.status = "today";
      return data;
    }

    if (dataBasedDate < currentTime && data.status === "concluded") {
      data.date.day = currentDay;
      data.status = "today";
      return data;
    }

    if (dataBasedDate === currentTime && data.status === "concluded") {
      data.status = "concluded";
      return data;
    }

    if (dataBasedDate < currentTime && data.status !== "concluded") {
      data.status = "delayed";
      return data;
    }
  },

  weekly(data) {
    if (data.date.includes(currentDayOfTheWeek) && data.status !== "concluded") {
      data.status = "today";
      return data;
    }

    if (
      (!data.date.includes(currentDayOfTheWeek) && data.status === "concluded") ||
      data.status === "pending"
    ) {
      data.status = "pending"
      return data;
    }

    if (data.date.includes(currentDayOfTheWeek) && data.status === "concluded") {
      data.status = "concluded"
      return data;
    }

    if (
      !data.date.includes(currentDayOfTheWeek) &&
      data.status !== "concluded" &&
      data.status !== "pending"
    ) {
      data.status = "delayed"
      return data;
    }
  },

  monthly(data) {
    const dataBasedDate = new Date(
      currentYear,
      data.date.month,
      data.date.day
    ).getTime();

    if (dataBasedDate === currentTime && data.status !== "concluded") {
      data.status = "today";
      return data;
    }

    if (dataBasedDate < currentTime && data.status === "concluded") {
      data.date.month = currentMonth + 1;
      data.status = "pending";
      return data;
    }

    if (dataBasedDate >= currentTime && data.status === "concluded") {
      data.status = "concluded";
      return data;
    }

    if (dataBasedDate > currentTime) {
      data.status = "pending";
      return data;
    }

    if (dataBasedDate < currentTime && data.status !== "concluded") {
      data.status = "delayed";
      return data;
    }
  },

  yearly(data) {
    const dataBasedDate = new Date(
      data.date.year,
      data.date.month,
      data.date.day
    ).getTime();

    if (dataBasedDate === currentTime && data.status !== "concluded") {
      data.status = "today";
      return data;
    }

    if (dataBasedDate < currentTime && data.status === "concluded") {
      data.date.year = currentYear + 1;
      data.status = "pending";
      return data;
    }

    if (dataBasedDate >= currentTime && data.status === "concluded") {
      data.status = "concluded";
      return data;
    }

    if (dataBasedDate > currentTime) {
      data.status = "pending";
      return data;
    }

    if (dataBasedDate < currentTime && data.status !== "concluded") {
      data.status = "delayed";
      return data;
    }
  },

  someday(data) {
    if (data.status === "concluded") {
      data.status = "concluded";
    } else {
      data.status = "someday";
    }

    return data;
  }
};

function setProperStatus(data) {
  if (data.status !== "deleted" && functions[data.type]) {
    return functions[data.type](data);
  }

  return data;
}

export default setProperStatus;
