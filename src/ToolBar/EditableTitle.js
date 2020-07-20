import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";

import { updateContextName } from "../contextManager";
import { getTodosBy, editTodo } from "../todoManager";

export default function EditableTitle(props) {
  const [value, setValue] = useState(props.defaultValue);
  useEffect(() => setValue(props.defaultValue), [props.defaultValue]);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleBlur() {
    if (value !== "") {
      getTodosBy("context", props.defaultValue).forEach((todo) => {
        todo.context = value;
        editTodo(todo);
      });
      updateContextName(props.defaultValue, value);
      props.onBlur(value);
    } else {
      setValue(props.defaultValue);
    }
  }

  const isReadOnly =
    props.defaultValue === "general" || props.defaultValue === "deleted";

  return (
    <Form.Group className="mb-0">
      <Form.Label srOnly>Context title, click to edit</Form.Label>
      <Form.Control
        type="text"
        htmlSize={7}
        value={value}
        plaintext={isReadOnly}
        readOnly={isReadOnly}
        className="bg-dark text-center text-capitalize text-light border-0"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Form.Group>
  );
}
