const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentDayOfTheWeek = currentDate.getDay();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const currentTime = new Date(currentYear, currentMonth, currentDay).getTime();
const tomorrow = new Date(currentYear, currentMonth, currentDay + 1);

const types = {
  daily(data) {
    const status = {
      pending() {
        data.date.day = currentDay;
        data.status = "today";
      },

      today() {
        if (data.date.day < currentDay) {
          data.status = "delayed";
        }
      },

      concluded() {
        if (data.date.day < currentDay) {
          data.date.day = currentDay;
          data.status = "today";
        }
      },
    };

    if (status[data.status]) {
      status[data.status]();
    }

    return data;
  },

  weekly(data) {
    const status = {
      pending() {
        if (data.date.includes(currentDayOfTheWeek)) {
          data.status = "today";
        }
      },

      today() {
        if (!data.date.includes(currentDayOfTheWeek)) {
          data.status = "delayed";
        }
      },

      concluded() {
        if (!data.date.includes(currentDayOfTheWeek)) {
          data.status = "pending";
        }
      },
    };

    if (status[data.status]) {
      status[data.status]();
    }

    return data;
  },

  monthly(data) {
    const status = {
      pending() {
        if (data.date.day === currentDay) {
          data.status = "today";
        } else if (
          tomorrow.getMonth() > currentMonth &&
          [29, 30, 31].includes(data.date.day)
        ) {
          data.status = "today";
        }
      },

      today() {
        if (data.date.day < currentDay) {
          data.status = "delayed";
        }
      },

      concluded() {
        if (data.date.day < currentDay) {
          data.status = "pending";
        }
      },
    };

    if (status[data.status]) {
      status[data.status]();
    }

    return data;
  },

  yearly(data) {
    const dataTime = new Date(
      currentYear,
      data.date.month,
      data.date.day
    ).getTime();
    const status = {
      pending() {
        if (dataTime === currentTime) {
          data.status = "today";
        } else if (
          data.date.day === 29 &&
          data.date.month === 1 &&
          tomorrow.getMonth() === 2
        ) {
          data.status = "today";
        }
      },

      today() {
        if (dataTime < currentTime) {
          data.status = "delayed";
        }
      },

      concluded() {
        if (dataTime < currentTime) {
          data.status = "pending";
        }
      },
    };

    if (status[data.status]) {
      status[data.status]();
    }

    return data;
  },

  someday(data) {
    if (data.status === "concluded") {
      data.status = "concluded";
    } else {
      data.status = "someday";
    }

    return data;
  },
};

function setProperStatus(data) {
  if (data.status !== "deleted" && types[data.type]) {
    return types[data.type](data);
  }

  return data;
}

export default setProperStatus;
