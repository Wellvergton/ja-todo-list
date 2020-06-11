import React from "react";
import "./ToolBar.scss";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Octicon, { ListUnordered, Plus, X } from "@primer/octicons-react";
import CreateContextModal from "../CreateContextModal/CreateContextModal";
import CreateTodoModal from "../CreateTodoModal/CreateTodoModal";

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsVisible: false,
      showCreateContextModal: false,
      showCreateTodoModal: false,
    };
    this.nav = React.createRef();
    this.showHideMenu = this.showHideMenu.bind(this);
    this.setNavStyle = this.setNavStyle.bind(this);
    this.showHideContextModal = this.showHideContextModal.bind(this);
    this.showHideTodoModal = this.showHideTodoModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
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

  showHideContextModal() {
    this.setState({
      showCreateContextModal: !this.state.showCreateContextModal,
    });
  }

  showHideTodoModal() {
    this.setState({
      showCreateTodoModal: !this.state.showCreateTodoModal,
    });
  }

  handleSave(name) {
    this.props.onCreateContext(name);
    this.showHideMenu();
  }

  componentDidMount() {
    this.setNavStyle();
  }

  componentDidUpdate() {
    this.setNavStyle();
  }

  render() {
    const contexts = this.props.contexts
      .sort()
      .filter((context) => context !== "deleted")
      .map((context, index) => {
        return (
          <Nav.Item
            className={`my-2 text-capitalize ${
              context === this.props.contextName ? "d-none" : ""
            }`}
            onClick={this.props.changeContext}
            key={context + index}
          >
            {context}
          </Nav.Item>
        );
      });

    return (
      <>
        {this.state.showCreateContextModal && (
          <CreateContextModal
            show={this.state.showCreateContextModal}
            contexts={this.props.contexts}
            onClose={this.showHideContextModal}
            onSave={this.handleSave}
          />
        )}
        {this.state.showCreateTodoModal && (
          <CreateTodoModal
            show={this.state.showCreateTodoModal}
            contexts={this.props.contexts}
            onClose={this.showHideTodoModal}
            onSave={this.props.addTodo}
          />
        )}
        <Navbar bg="light" expand="md">
          <Button variant="light" onClick={this.showHideMenu}>
            <Octicon
              icon={this.state.menuIsVisible ? X : ListUnordered}
              size="medium"
            />
          </Button>
          <Navbar.Text className="text-capitalize text-body">
            {this.props.contextName}
          </Navbar.Text>
          <Button variant="light" onClick={this.showHideTodoModal}>
            <Octicon icon={Plus} size="medium" />
          </Button>
          <Nav ref={this.nav} className="w-100">
            {contexts}
            <Nav.Item
              className={`my-2 text-capitalize ${
                this.props.contextName === "deleted" ? "d-none" : ""
              }`}
              onClick={this.props.changeContext}
            >
              deleted
            </Nav.Item>
            <Nav.Item className="my-0">
              <Button
                variant="outline-info"
                block
                onClick={this.showHideContextModal}
              >
                <span className="font-weight-bold">Create a context</span>
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default ToolBar;
