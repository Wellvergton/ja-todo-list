import {
  TodosObserver,
  setTodoAsDeleted,
  deleteTodoPermanently,
  restoreTodo,
  concludeTodo,
  isTodoDuplicatedOn,
  addTodo,
  editTodo,
  getTodosBy,
} from "./todoManager";

const mockTodo = {
  status: "pending",
  title: "test",
  context: "general",
  description: "test",
  type: "someday",
  date: { day: new Date().getDate() },
};
const anotherMock = {
  status: "pending",
  title: "another test",
  context: "test",
  description: "test",
  type: "someday",
  date: { day: new Date().getDate() },
};
const duplicateMock = {
  status: "pending",
  title: "test",
  context: "general",
  description: "test",
  type: "someday",
  date: { day: new Date().getDate() },
};

let todos = null;

function subscriber(value) {
  todos = value;
}

beforeAll(() => TodosObserver.subscribe(subscriber));

afterAll(() => TodosObserver.unsubscribe(subscriber));

it("should ensure that the subscription worked", () => {
  expect(Array.isArray(todos)).toBeTruthy();
});

it("should add a new todo", () => {
  addTodo(mockTodo);
  expect(todos).toContain(mockTodo);
  expect(mockTodo).toHaveProperty("id");
});

describe("will test for duplicity of todos on creation", () => {
  it("should be a duplicate", () => {
    expect(isTodoDuplicatedOn("create", duplicateMock)).toBeTruthy();
  });

  it("should not be a duplicate", () => {
    expect(isTodoDuplicatedOn("create", anotherMock)).not.toBeTruthy();
  });
});

describe("will test for duplicity of todos on edition", () => {
  it("should not be a duplicate when the data was not changed or is the same", () => {
    expect(
      isTodoDuplicatedOn("edit", mockTodo, duplicateMock)
    ).not.toBeTruthy();
  });

  it("should not be a duplicate when the data is different", () => {
    expect(isTodoDuplicatedOn("edit", anotherMock, mockTodo)).not.toBeTruthy();
  });

  it("should be a duplicate", () => {
    expect(isTodoDuplicatedOn("edit", mockTodo, anotherMock)).toBeTruthy();
  });
});

it.todo("test getTodosBy");

it("should set todo as deleted", () => {
  setTodoAsDeleted(mockTodo.id);
  expect(mockTodo.status).toBe("deleted");
});

it("should restore the todo", () => {
  restoreTodo(mockTodo.id);
  expect(mockTodo.status).toBe("pending");
});

it("should set todo as concluded", () => {
  concludeTodo(mockTodo.id);
  expect(mockTodo.status).toBe("concluded");
});

it("should change the todo data", () => {
  const newData = JSON.parse(JSON.stringify(mockTodo));
  newData.title = "new title";
  newData.description = "new desciption";
  editTodo(newData);
  const editedTodo = todos.find((todo) => todo.id === mockTodo.id);
  expect(editedTodo.title).toBe("new title");
  expect(editedTodo.description).toBe("new desciption");
});

it("should delete permanently the todo", () => {
  deleteTodoPermanently("id", mockTodo.id);
  expect(todos.every((todo) => todo.id !== mockTodo.id)).toBeTruthy();
});
