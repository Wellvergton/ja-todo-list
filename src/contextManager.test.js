import {
  ContextObserver,
  getContexts,
  isContextDuplicate,
  addContext,
  updateContextName,
  deleteContext,
} from "./contextManager";

let contexts = null;

function subscriber(value) {
  contexts = value;
}

beforeAll(() => ContextObserver.subscribe(subscriber));

afterAll(() => ContextObserver.unsubscribe(subscriber));

it("should ensure that contexts has get the firsts contexts", () => {
  expect(Array.isArray(contexts)).toBeTruthy();
});

it("should ensure that getContext return the same context given by the observer", () => {
  expect(
    getContexts().every((context) => contexts.includes(context))
  ).toBeTruthy();
});

it("should check if a new context is duplicate or not", () => {
  expect(isContextDuplicate("general")).toBeTruthy();
  expect(isContextDuplicate("test")).not.toBeTruthy();
});

it("should add a new context", () => {
  addContext("test");

  expect(contexts).toContain("test");
});

it("should update a context name", () => {
  addContext("to update");

  expect(contexts).toContain("to update");

  updateContextName("to update", "updated");

  expect(contexts).not.toContain("to update");
  expect(contexts).toContain("updated");
});

it("should delete a context", () => {
  deleteContext("test");

  expect(contexts).not.toContain("test");
});
