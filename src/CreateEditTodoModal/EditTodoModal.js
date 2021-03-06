import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import BaseForm from "./BaseForm";

import { isTodoDuplicatedOn, editTodo } from "../todoManager";

async function updateTodo(data) {
  const URL = "http://localhost:3001/todos/";
  const requestInit = {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    cache: "default",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(URL, requestInit);
    const responseTodo = JSON.parse(await response.text());
    responseTodo.date = JSON.parse(responseTodo.date);

    editTodo(responseTodo);
  } catch (error) {
    editTodo(data);
  }
}

export default function EditTodoModal(props) {
  const [formData, setFormData] = useState(
    JSON.parse(JSON.stringify(props.data))
  );
  const [formIsInvalid, setFormIsInvalid] = useState(false);
  const originalData = props.data;

  useEffect(validateInfo, [formData]);

  function handleSave() {
    updateTodo(formData);
    // editTodo(formData);
    props.onClose();
  }

  function isTodoDuplicated() {
    return isTodoDuplicatedOn("edit", formData, originalData);
  }

  function validateInfo() {
    setFormIsInvalid(
      formData.title === "" || isTodoDuplicated() || formData.date.length === 0
    );
  }

  function setDateFormat(type) {
    let format;

    switch (type) {
      case "weekly":
        format = [];
        break;
      case "monthly":
        format = { day: 1 };
        break;
      case "yearly":
        format = { day: 1, month: 0 };
        break;
      default:
        format = {};
        break;
    }

    return format;
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const formDataCopy = JSON.parse(JSON.stringify(formData));

    if (name === "type") {
      formDataCopy.date = setDateFormat(value);
    }

    if (name === "weekly") {
      if (!formDataCopy.date.includes(parseInt(value))) {
        formDataCopy.date.push(parseInt(value));
      } else {
        formDataCopy.date = formDataCopy.date.filter(
          (day) => day !== parseInt(value)
        );
      }
    } else if (name === "day" || name === "month") {
      formDataCopy.date[name] = parseInt(value);
    } else {
      formDataCopy[name] = value;
    }

    setFormData(formDataCopy);
  }

  return (
    <Modal
      show={props.show}
      animation={false}
      centered={true}
      onHide={props.onClose}
      backdrop="static"
      aria-labelledby="edit-todo-modal-title"
    >
      <Modal.Header>
        <Modal.Title id="edit-todo-modal-title">Edit this Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BaseForm
          formData={formData}
          contexts={props.contexts}
          handleChange={handleChange}
          checkDuplicate={isTodoDuplicated}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" disabled={formIsInvalid} onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
