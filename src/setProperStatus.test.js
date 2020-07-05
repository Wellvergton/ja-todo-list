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

  test(testStatus("today"), () => {
    result = setProperStatus(testData);
    expect(result.status).toBe("today");

    testData.date.day = today.getDate() - 1;
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("today");
    expect(result.date.day).toEqual(today.getDate());
  });

  test(testStatus("concluded"), () => {
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("concluded");
  });

  test(testStatus("delayed"), () => {
    testData.date.day = today.getDate() - 1;
    testData.status = "today";
    result = setProperStatus(testData);
    expect(result.status).toBe("delayed");
  });
});

describe(descriptionFor("weekly"), () => {
  beforeEach(() => (testData.type = "weekly"));

  test(testStatus("today"), () => {
    testData.date = [today.getDay()];
    result = setProperStatus(testData);
    expect(result.status).toBe("today");
  });

  test(testStatus("pending"), () => {
    testData.date = [today.getDay() - 2, today.getDay() + 2];
    result = setProperStatus(testData);
    expect(result.status).toBe("pending");
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("pending");
  });

  test(testStatus("concluded"), () => {
    testData.date = [today.getDay(), today.getDay() - 2, today.getDay() + 2];
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("concluded");
  });

  test(testStatus("delayed"), () => {
    testData.date = [today.getDay() - 2, today.getDay() + 2];
    testData.status = "today";
    result = setProperStatus(testData);
    expect(result.status).toBe("delayed");
  });
});

describe(descriptionFor("monthly"), () => {
  beforeEach(() => (testData.type = "monthly"));

  test(testStatus("today"), () => {
    result = setProperStatus(testData);
    expect(result.status).toBe("today");
    // TODO: TEST FOR LEAP YEAR
  });

  test(testStatus("pending"), () => {
    testData.date.day = today.getDate() + 1;
    result = setProperStatus(testData);
    expect(result.status).toBe("pending");
  });

  test(testStatus("concluded"), () => {
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("concluded");
  });

  test(testStatus("delayed"), () => {
    testData.date.day = today.getDate() - 1;
    result = setProperStatus(testData);
    expect(result.status).toBe("delayed");
  });
});

describe(descriptionFor("yearly"), () => {
  beforeEach(() => (testData.type = "yearly"));

  test(testStatus("today"), () => {
    result = setProperStatus(testData);
    expect(result.status).toBe("today");
  });

  test(testStatus("pending"), () => {
    testData.date.day = today.getDate() + 1;
    result = setProperStatus(testData);
    expect(testData.status).toBe("pending");
    testData.date.month = today.getMonth() + 1;
    result = setProperStatus(testData);
    expect(testData.status).toBe("pending");
  });

  test(testStatus("concluded"), () => {
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(testData.status).toBe("concluded");
  });

  test(testStatus("delayed"), () => {
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

  test(testStatus("someday"), () => {
    result = setProperStatus(testData);
    expect(result.status).toBe("someday");
  });

  test(testStatus("concluded"), () => {
    testData.status = "concluded";
    result = setProperStatus(testData);
    expect(result.status).toBe("concluded");
  });
});
