const today = new Date();

const functions = {
  daily(data) {
    data.date.day = today.getDate();
    return data;
  },

  weekly(data) {
    data.date = data.date.sort();
    return data;
  },

  monthly(data) {
    const date = data.date;

    if (date.day < today.getDate()) {
      date.month = today.getMonth() + 1;
    } else {
      date.month = today.getMonth();
    }

    data.date = date;
    return data;
  },

  yearly(data) {
    const date = data.date;

    if (date.month < today.getMonth()) {
      date.day < today.getDate()
        ? (data.date.year = today.getFullYear() + 1)
        : (data.date.year = today.getFullYear());
    } else {
      data.date.year = today.getFullYear();
    }

    return data;
  },
};

function setFirstDate(data) {
  if (functions[data.type]) {
    return functions[data.type](data);
  }

  return data;
}

export default setFirstDate;
