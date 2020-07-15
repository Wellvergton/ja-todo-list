import { deleteTodoPermanently } from "./todoManager";

const defaultContexts = ["general", "deleted"];
let contexts = localStorage.contexts
  ? JSON.parse(localStorage.contexts)
  : defaultContexts;

const ContextObserver = {
  observers: [],

  notify() {
    this.observers.forEach((observer) => observer(contexts));
  },

  subscribe(callback) {
    this.observers.push(callback);
    this.notify();
  },

  unsubscribe(callback) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  },
};

function getContexts() {
  return contexts;
}

function isContextDuplicate(name) {
  return contexts.some((context) => context === name.toLowerCase());
}

function saveToLocalStorage() {
  localStorage.contexts = JSON.stringify(contexts);
}

function addContext(name) {
  contexts.push(name.toLowerCase());
  ContextObserver.notify();
  saveToLocalStorage();
}

function updateContextName(oldName, newName) {
  contexts[contexts.indexOf(oldName.toLowerCase())] = newName.toLowerCase();
  ContextObserver.notify();
  saveToLocalStorage();
}

function deleteContext(name) {
  deleteTodoPermanently("context", name);
  contexts = contexts.filter((context) => context !== name);
  ContextObserver.notify();
  saveToLocalStorage();
}

export {
  ContextObserver,
  getContexts,
  isContextDuplicate,
  addContext,
  updateContextName,
  deleteContext,
};
