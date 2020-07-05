import {
  TodosObserver,
  addTodo,
  setTodoAsDeleted,
  restoreTodo,
  concludeTodo,
  editTodo,
  deleteTodoPermanently,
} from "./todoManager";

const mockTodo = {
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

test("should ensure that the subscription worked", () => {
  expect(Array.isArray(todos)).toBeTruthy();
});

test("should add a new todo", () => {
  addTodo(mockTodo);
  expect(todos).toContain(mockTodo);
});

test("sould set todo as deleted", () => {
  setTodoAsDeleted(mockTodo.id);
  expect(mockTodo.status).toBe("deleted");
});

test("should restore the todo", () => {
  restoreTodo(mockTodo.id);
  expect(mockTodo.status).toBe("pending");
});

test("should set todo as concluded", () => {
  concludeTodo(mockTodo.id);
  expect(mockTodo.status).toBe("concluded");
});

test("should change the todo data", () => {
  const newData = JSON.parse(JSON.stringify(mockTodo));
  newData.title = "new title";
  newData.description = "new desciption";
  editTodo(newData);
  const editedTodo = todos.find((todo) => todo.id === mockTodo.id);
  expect(editedTodo.title).toBe("new title");
  expect(editedTodo.description).toBe("new desciption");
});

test("should delete permanently the todo", () => {
  deleteTodoPermanently("id", mockTodo.id);
  expect(todos.every((todo) => todo.id !== mockTodo.id)).toBeTruthy();
});
