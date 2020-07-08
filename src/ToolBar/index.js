import React from "react";
import "./index.scss";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Octicon, { ThreeBars, Plus, X } from "@primer/octicons-react";
import DeleteAlert from "./DeleteAlert";
import { getContexts, deleteContext } from "../contextManager";

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

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsVisible: false,
      deleteAlertIsVisible: false,
    };
    this.nav = React.createRef();
    this.showHideMenu = this.showHideMenu.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.setNavStyle = this.setNavStyle.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  showHideMenu() {
    this.setState({ menuIsVisible: !this.state.menuIsVisible });
  }

  showDeleteAlert() {
    this.setState({ deleteAlertIsVisible: true });
  }

  hideDeleteAlert() {
    this.setState({ deleteAlertIsVisible: false });
  }

  setNavStyle() {
    this.nav.current.style.display = this.state.menuIsVisible ? "" : "none";
    this.nav.current.style.maxHeight = this.state.menuIsVisible
      ? `${this.nav.current.scrollHeight}px`
      : "0px";
    this.nav.current.style.margin = this.state.menuIsVisible ? "" : "0 auto";
  }

  componentDidMount() {
    this.setNavStyle();
  }

  componentDidUpdate() {
    this.setNavStyle();
    setTimeout(() => this.props.onShowMenu());
  }

  onDelete() {
    deleteContext(this.props.currentContext);
    this.props.changeContext("general");
  }

  render() {
    const contexts = getContexts()
      .sort(sortContexts)
      .map((context, index) => {
        return (
          <Nav.Item
            className={`p-2 text-capitalize text-light ${
              context === this.props.currentContext ? "selected-nav-item" : ""
            }`}
            role="menuitem"
            tabIndex={0}
            onClick={() => this.props.changeContext(context)}
            onKeyDown={(event) => {
              if ([13, 32].includes(event.keyCode)) {
                this.props.changeContext(context);
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
        ref={this.props.forwardRef}
        aria-label="contexts menu"
      >
        <Button
          variant="dark"
          onClick={this.showHideMenu}
          aria-label={this.state.menuIsVisible ? "Close menu" : "Menu"}
          aria-haspopup="true"
          aria-expanded={this.state.menuIsVisible}
        >
          <Octicon
            icon={this.state.menuIsVisible ? X : ThreeBars}
            size="medium"
          />
        </Button>
        <Navbar.Text className="text-capitalize text-light">
          {this.props.contextName}
        </Navbar.Text>
        <Button
          variant="dark"
          onClick={this.props.showHideTodoModal}
          aria-label="Create a todo"
        >
          <Octicon icon={Plus} size="medium" />
        </Button>
        <Nav ref={this.nav} className="w-100" role="menu">
          {contexts}
          <Nav.Item className="my-2">
            <Button
              variant="primary"
              block
              onClick={this.props.showHideContextModal}
            >
              <span className="font-weight-bold">Create context</span>
            </Button>
          </Nav.Item>
          <Nav.Item
            className={`my-2 ${
              this.props.currentContext === "general" ||
              this.props.currentContext === "deleted"
                ? "d-none"
                : ""
            }`}
          >
            <Button variant="warning" block onClick={this.showDeleteAlert}>
              <span className="font-weight-bold">Delete current context</span>
            </Button>
          </Nav.Item>
          <DeleteAlert
            show={this.state.deleteAlertIsVisible}
            onHide={this.hideDeleteAlert}
            onDelete={this.onDelete}
          />
        </Nav>
      </Navbar>
    );
  }
}

export default React.forwardRef((props, ref) => {
  return <ToolBar forwardRef={ref} {...props} />;
});
