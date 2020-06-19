import React from "react";
import "./ToolBar.scss";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Octicon, { ListUnordered, Plus, X } from "@primer/octicons-react";

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

  render() {
    const contexts = this.props.contexts
      .sort()
      .filter((context) => context !== "deleted")
      .map((context, index) => {
        return (
          <Nav.Item
            className={`my-2 text-capitalize ${
              context === this.props.contextName ? "text-info" : "text-light"
            }`}
            onClick={() => this.props.changeContext(context)}
            key={context + index}
          >
            {context}
          </Nav.Item>
        );
      });

    return (
      <Navbar bg="dark" expand="md" ref={this.navBar}>
        <Button variant="dark" onClick={this.showHideMenu}>
          <Octicon
            icon={this.state.menuIsVisible ? X : ListUnordered}
            size="medium"
          />
        </Button>
        <Navbar.Text className="text-capitalize text-light">
          {this.props.contextName}
        </Navbar.Text>
        <Button variant="dark" onClick={this.props.showHideTodoModal}>
          <Octicon icon={Plus} size="medium" />
        </Button>
        <Nav ref={this.nav} className="w-100">
          {contexts}
          <Nav.Item
            className={`my-2 text-capitalize ${
              this.props.contextName === "deleted" ? "text-info" : "text-light"
            }`}
            onClick={() => this.props.changeContext("deleted")}
          >
            deleted
          </Nav.Item>
          <Nav.Item className="my-2">
            <Button
              variant="outline-info"
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
            <Button
              variant="outline-warning"
              block
              onClick={() => this.props.onDeleteContext(this.props.contextName)}
            >
              <span className="font-weight-bold">Delete current context</span>
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

export default ToolBar;
