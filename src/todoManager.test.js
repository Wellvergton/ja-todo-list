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

it("should ensure that the subscription worked", () => {
  expect(Array.isArray(todos)).toBeTruthy();
});

it("should add a new todo", () => {
  addTodo(mockTodo);
  expect(todos).toContain(mockTodo);
  expect(mockTodo).toHaveProperty("id");
});

it("sould set todo as deleted", () => {
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
