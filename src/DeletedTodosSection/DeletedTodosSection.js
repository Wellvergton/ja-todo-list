import React from "react";
import Todo from "../Todo/Todo";

function DeletedTodosScreen(props) {
  const contexts = [];
  const sections = [];
  const todos = {};

  props.todos
    .filter((todo) => todo.status === "deleted")
    .forEach((todo) => {
      if (!contexts.includes(todo.context)) {
        contexts.push(todo.context);
      }

      if (!todos[todo.context]) {
        todos[todo.context] = [];
      }

      todos[todo.context].push(
        <Todo
          data={todo}
          key={todo.title + todo.context}
          restore={props.restoreTodo}
        />
      );
    });

  contexts.sort();

  contexts.forEach((context) => {
    sections.push(
      <section key={context}>
        <p className="h3 font-weight-bold text-capitalize">{context}</p>
        {todos[context]}
      </section>
    );
  });

  return sections;
}

export default DeletedTodosScreen;
