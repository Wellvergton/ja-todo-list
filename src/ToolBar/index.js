import React from "react";
import "./index.scss";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Octicon, { ThreeBars, Plus, X } from "@primer/octicons-react";
import { deleteContext } from "../contextManager";

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsVisible: false,
    };
    this.navBar = React.createRef();
    this.nav = React.createRef();
    this.showHideMenu = this.showHideMenu.bind(this);
    this.setNavStyle = this.setNavStyle.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  showHideMenu() {
    this.setState({ menuIsVisible: !this.state.menuIsVisible });
  }

  setNavStyle() {
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
    this.props.onShowMenu(this.navBar.current.clientHeight);
  }

  onDelete() {
    deleteContext(this.props.contextName);
    this.props.changeContext("general");
  }

  render() {
    const contexts = this.props.contexts
      .sort()
      .filter((context) => context !== "deleted")
      .map((context, index) => {
        return (
          <Nav.Item
            className={`my-2 text-capitalize text-light ${
              context === this.props.contextName ? "font-weight-bold" : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => this.props.changeContext(context)}
            key={context + index}
          >
            {context}
          </Nav.Item>
        );
      });

    return (
      <Navbar bg="dark" expand="" ref={this.navBar}>
        <Button
          variant="dark"
          onClick={this.showHideMenu}
          aria-label={this.state.menuIsVisible ? "Close menu" : "Menu"}
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
        <Nav ref={this.nav} className="w-100">
          {contexts}
          <Nav.Item
            className={`my-2 text-capitalize ${
              this.props.contextName === "deleted" ? "text-info" : "text-light"
            }`}
            role="button"
            tabIndex={0}
            onClick={() => this.props.changeContext("deleted")}
          >
            deleted
          </Nav.Item>
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
              this.props.contextName === "general" ||
              this.props.contextName === "deleted"
                ? "d-none"
                : ""
            }`}
          >
            <Button variant="warning" block onClick={this.onDelete}>
              <span className="font-weight-bold">Delete current context</span>
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

export default ToolBar;
