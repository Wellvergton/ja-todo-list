const defaultTodos = [
  {
    id: 1,
    status: "pending",
    title: "My first todo",
    context: "general",
    description: "Describe me",
    type: "someday",
    date: { day: new Date().getDate() },
  },
];
let todos = localStorage.todos ? JSON.parse(localStorage.todos) : defaultTodos;

const TodosObserver = {
  observers: [],

  notify() {
    this.observers.forEach((observer) => observer(todos));
  },

  subscribe(callback) {
    this.observers.push(callback);
    this.notify();
  },

  unsubscribe(callback) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  },
};

function saveTodosToLocalStorage() {
  localStorage.todos = JSON.stringify(todos);
}

function deleteTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.status = "deleted";
    }
    return todo;
  });

  TodosObserver.notify();
  saveTodosToLocalStorage();
}

function restoreTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.status = "pending";
    }
    return todo;
  });

  TodosObserver.notify();
  saveTodosToLocalStorage();
}

function concludeTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      if (todo.status !== "concluded") {
        todo.status = "concluded";
      } else {
        todo.status = "pending";
      }
    }

    return todo;
  });

  TodosObserver.notify();
  saveTodosToLocalStorage();
}

function addTodo(data) {
  const length = todos.length;

  data.status = "pending";

  for (let i = 1; i <= length + 1; i++) {
    if (!todos.some((todo) => todo.id === i)) {
      data.id = i;
    }
  }

  if (data.type === "weekly") {
    data.date = data.date.sort();
  }

  todos.push(data);

  TodosObserver.notify();
  saveTodosToLocalStorage();
}

function editTodo(data) {
  if (data.type === "weekly") {
    data.date = data.date.sort();
  }

  todos = todos.map((todo) => (todo.id === data.id ? data : todo));

  TodosObserver.notify();
  saveTodosToLocalStorage();
}

export {
  deleteTodo,
  restoreTodo,
  concludeTodo,
  addTodo,
  editTodo,
  TodosObserver,
};
