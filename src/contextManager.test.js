import {
  ContextObserver,
  getContexts,
  isContextDuplicate,
  addContext,
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

it("sould ensure that getContext return the same context given by the observer", () => {
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

it("should delete a context", () => {
  deleteContext("test");

  expect(contexts).not.toContain("test");
});
