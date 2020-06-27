const defaultContexts = ["general", "deleted"];
let contexts = localStorage.contexts
  ? JSON.parse(localStorage.contexts)
  : defaultContexts;

const ContextObserver = {
  observers: [],

  notify(value) {
    this.observers.forEach((observer) => observer(value));
  },

  subscribe(callback) {
    this.observers.push(callback);
    this.notify();
  },

  unsubscribe(callback) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  },
};

function saveToLocalStorage() {
  localStorage.contexts = JSON.stringify(contexts);
}

function addContext(name) {
  contexts.push(name);
  ContextObserver.notify(contexts);
  saveToLocalStorage();
}

function deleteContext(name) {
  contexts = contexts.filter((context) => context !== name);
  ContextObserver.notify(contexts);
  saveToLocalStorage();
}

export { addContext, deleteContext, ContextObserver };
