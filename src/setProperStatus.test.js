import setProperStatus from "./setProperStatus";

const today = new Date();
const mockData = {
  id: 1,
  status: "pending",
  title: "test",
  context: "general",
  description: "test",
  type: "someday",
  date: { day: today.getDate(), month: today.getMonth() },
};
let testData;
let result;

beforeEach(() => {
  testData = JSON.parse(JSON.stringify(mockData));
  result = null;
});

function descriptionFor(type) {
  return `will set the proper status for ${type} todos`;
}

function testStatus(status) {
  return `should set the status to ${status}`;
}

describe(descriptionFor("daily"), () => {
  beforeEach(() => (testData.type = "daily"));

  it(testStatus("today"), () => {
    result = setProperStatus(testData);
    expect(result.status).toBe("today");

    testData.date.day = today.getDate() - 1;
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("today");
    expect(result.date.day).toEqual(today.getDate());
  });

  it(testStatus("concluded"), () => {
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("concluded");
  });

  it(testStatus("delayed"), () => {
    testData.date.day = today.getDate() - 1;
    testData.status = "today";
    result = setProperStatus(testData);
    expect(result.status).toBe("delayed");
  });
});

describe(descriptionFor("weekly"), () => {
  beforeEach(() => (testData.type = "weekly"));

  it(testStatus("today"), () => {
    testData.date = [today.getDay()];
    result = setProperStatus(testData);
    expect(result.status).toBe("today");
  });

  it(testStatus("pending"), () => {
    testData.date = [today.getDay() - 2, today.getDay() + 2];
    result = setProperStatus(testData);
    expect(result.status).toBe("pending");
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("pending");
  });

  it(testStatus("concluded"), () => {
    testData.date = [today.getDay(), today.getDay() - 2, today.getDay() + 2];
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("concluded");
  });

  it(testStatus("delayed"), () => {
    testData.date = [today.getDay() - 2, today.getDay() + 2];
    testData.status = "today";
    result = setProperStatus(testData);
    expect(result.status).toBe("delayed");
  });
});

describe(descriptionFor("monthly"), () => {
  beforeEach(() => (testData.type = "monthly"));

  it(testStatus("today"), () => {
    result = setProperStatus(testData);
    expect(result.status).toBe("today");
  });

  test.todo("test for the last days of the month");

  it(testStatus("pending"), () => {
    testData.date.day = today.getDate() + 1;
    result = setProperStatus(testData);
    expect(result.status).toBe("pending");
  });

  it(testStatus("concluded"), () => {
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("concluded");
  });

  it(testStatus("delayed"), () => {
    testData.date.day = today.getDate() - 1;
    result = setProperStatus(testData);
    expect(result.status).toBe("delayed");
  });
});

describe(descriptionFor("yearly"), () => {
  beforeEach(() => (testData.type = "yearly"));

  it(testStatus("today"), () => {
    result = setProperStatus(testData);
    expect(result.status).toBe("today");
  });

  test.todo("test for leap year");

  it(testStatus("pending"), () => {
    testData.date.day = today.getDate() + 1;
    result = setProperStatus(testData);
    expect(testData.status).toBe("pending");
    testData.date.month = today.getMonth() + 1;
    result = setProperStatus(testData);
    expect(testData.status).toBe("pending");
  });

  it(testStatus("concluded"), () => {
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(testData.status).toBe("concluded");
  });

  it(testStatus("delayed"), () => {
    testData.date.day = today.getDate() - 1;
    result = setProperStatus(testData);
    expect(testData.status).toBe("delayed");
    testData.date.month = today.getMonth() - 1;
    result = setProperStatus(testData);
    expect(testData.status).toBe("delayed");
  });
});

describe(descriptionFor("someday"), () => {
  beforeEach(() => (testData.type = "someday"));

  it(testStatus("someday"), () => {
    result = setProperStatus(testData);
    expect(result.status).toBe("someday");
  });

  it(testStatus("concluded"), () => {
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("concluded");
  });
});
