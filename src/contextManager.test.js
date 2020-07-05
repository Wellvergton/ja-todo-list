import { addContext, deleteContext, ContextObserver } from "./contextManager";

let contexts = null;

function subscriber(value) {
  contexts = value;
}

beforeAll(() => ContextObserver.subscribe(subscriber));

afterAll(() => ContextObserver.unsubscribe(subscriber));

test("should ensure that contexts has get the firsts contexts", () => {
  expect(Array.isArray(contexts)).toBeTruthy();
});

test("should add a new context", () => {
  addContext("test");

  expect(contexts).toContain("test");
});

test("should delete a context", () => {
  deleteContext("test");

  expect(contexts).not.toContain("test");
});
