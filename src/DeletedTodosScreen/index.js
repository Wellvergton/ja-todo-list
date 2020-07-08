import React from "react";
import Col from "react-bootstrap/Col";
import Todo from "../Todo";
import { getTodosBy, restoreTodo } from "../todoManager";

export default function DeletedTodosScreen(props) {
  const contexts = [];
  const sections = [];
  const todos = {};

  getTodosBy("status", "deleted").forEach((todo) => {
    if (!contexts.includes(todo.context)) {
      contexts.push(todo.context);
    }

    if (!todos[todo.context]) {
      todos[todo.context] = [];
    }

    todos[todo.context].push(
      <Todo data={todo} key={todo.id} restore={() => restoreTodo(todo.id)} />
    );
  });

  contexts.sort();

  contexts.forEach((context) => {
    sections.push(
      <Col as="section" key={context} xs={12} sm={6} md={4} lg={3}>
        <p className="h3 font-weight-bold text-capitalize">{context}</p>
        {todos[context]}
      </Col>
    );
  });

  return sections;
}
