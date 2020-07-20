import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Octicon, { ThreeBars, Plus, X } from "@primer/octicons-react";

import DeleteAlert from "./DeleteAlert";
import EditableTitle from "./EditableTitle";

import { getContexts, deleteContext } from "../contextManager";
import { deleteTodoPermanently } from "../todoManager";

function sortContexts(a, b) {
  if (a === b) {
    return 0;
  } else if (a === "deleted") {
    return 1;
  } else if (b === "deleted") {
    return -1;
  } else {
    return a > b ? 1 : -1;
  }
}

function ToolBar(props) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [deleteAlertIsVisible, setDeleteAlertIsVisible] = useState(false);
  const [deleteAlertType, setDeleteAlertType] = useState("forDeleteContext");

  useEffect(() => {
    setNavStyle();
    setTimeout(() => props.onShowMenu());
  });

  const nav = useRef(null);

  function showHideMenu() {
    setMenuIsVisible(!menuIsVisible);
  }

  function showDeleteAlertFor(type) {
    setDeleteAlertIsVisible(true);
    setDeleteAlertType(type);
  }

  function hideDeleteAlert() {
    setDeleteAlertIsVisible(false);
  }

  function setNavStyle() {
    nav.current.style.display = menuIsVisible ? "" : "none";
    nav.current.style.maxHeight = menuIsVisible
      ? `${nav.current.scrollHeight}px`
      : "0px";
    nav.current.style.margin = menuIsVisible ? "" : "0 auto";
  }

  const alertData = {
    forDeleteContext: {
      warning: "This action will delete this context and all related todos.",
      onDelete: () => {
        deleteContext(props.currentContext);
        props.changeContext("general");
      },
    },

    forClearDeleted: {
      warning: "This action will remove permanently all deleted todos.",
      onDelete: () => {
        deleteTodoPermanently("status", "deleted");
        props.changeContext("general");
      },
    },
  };

  const contexts = getContexts()
    .sort(sortContexts)
    .map((context, index) => {
      return (
        <Nav.Item
          className={`p-2 text-capitalize text-light ${
            context === props.currentContext ? "selected-nav-item" : ""
          }`}
          role="menuitem"
          tabIndex={0}
          onClick={() => props.changeContext(context)}
          onKeyDown={(event) => {
            if ([13, 32].includes(event.keyCode)) {
              props.changeContext(context);
            }
          }}
          key={context + index}
        >
          {context}
        </Nav.Item>
      );
    });

  return (
    <Navbar
      bg="dark"
      expand=""
      ref={props.forwardRef}
      aria-label="contexts menu"
    >
      <Button
        variant="dark"
        onClick={showHideMenu}
        aria-label={menuIsVisible ? "Close menu" : "Menu"}
        aria-haspopup="true"
        aria-expanded={menuIsVisible}
      >
        <Octicon icon={menuIsVisible ? X : ThreeBars} size="medium" />
      </Button>
      <Navbar.Text className="text-capitalize text-light">
        <EditableTitle
          defaultValue={props.currentContext}
          onBlur={props.changeContext}
        />
      </Navbar.Text>
      <Button
        variant="dark"
        onClick={props.showHideTodoModal}
        aria-label="Create a todo"
      >
        <Octicon icon={Plus} size="medium" />
      </Button>
      <Nav ref={nav} className="w-100" role="menu">
        {contexts}
        <Nav.Item className="my-2">
          <Button variant="primary" block onClick={props.showHideContextModal}>
            <span className="font-weight-bold">Create context</span>
          </Button>
        </Nav.Item>
        <Nav.Item
          className={`my-2 ${
            props.currentContext === "general" ||
            props.currentContext === "deleted"
              ? "d-none"
              : ""
          }`}
        >
          <Button
            variant="warning"
            block
            onClick={() => showDeleteAlertFor("forDeleteContext")}
          >
            <span className="font-weight-bold">Delete current context</span>
          </Button>
        </Nav.Item>
        <Nav.Item
          className={`my-2 ${
            props.currentContext !== "deleted" ? "d-none" : ""
          }`}
        >
          <Button
            variant="danger"
            block
            onClick={() => showDeleteAlertFor("forClearDeleted")}
          >
            <span className="font-weight-bold">Clear deleted todos</span>
          </Button>
        </Nav.Item>
        <DeleteAlert
          show={deleteAlertIsVisible}
          onHide={hideDeleteAlert}
          alertInfo={alertData[deleteAlertType].warning}
          onDelete={alertData[deleteAlertType].onDelete}
        />
      </Nav>
    </Navbar>
  );
}

export default React.forwardRef((props, ref) => {
  return <ToolBar forwardRef={ref} {...props} />;
});
