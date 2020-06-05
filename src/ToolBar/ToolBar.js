import React from "react";
import "./ToolBar.scss";
import Octicon, { ThreeBars, Plus, X } from "@primer/octicons-react";

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsVisible: false,
    };
    this.ul = React.createRef();
    this.showHideMenu = this.showHideMenu.bind(this);
    this.setUlStyle = this.setUlStyle.bind(this);
  }

  showHideMenu() {
    this.setState({ menuIsVisible: !this.state.menuIsVisible });
  }

  setUlStyle() {
    this.ul.current.style.maxHeight = this.state.menuIsVisible
      ? `${this.ul.current.scrollHeight}px`
      : "";
    this.ul.current.style.margin = this.state.menuIsVisible ? "" : "0 auto";
  }

  componentDidMount() {
    this.setUlStyle();
  }

  componentDidUpdate() {
    this.setUlStyle();
  }

  render() {
    const contexts = this.props.contexts.map((context, index) => {
      return (
        <li
          className={`nav-item my-2 text-capitalize ${
            context === this.props.contextName ? "d-none" : ""
          }`}
          onClick={this.props.changeContext}
          key={context + index}
        >
          {context}
        </li>
      );
    });

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <button className="btn btn-light p-0" onClick={this.showHideMenu}>
          <Octicon
            icon={this.state.menuIsVisible ? X : ThreeBars}
            size="medium"
          />
        </button>
        <span className="text-capitalize">{this.props.contextName}</span>
        <button className="btn btn-light p-0" onClick={this.props.addTodo}>
          <Octicon icon={Plus} size="medium" />
        </button>
        <ul ref={this.ul} id="navbar-list" className="navbar-nav w-100">
          {contexts}
          <li className="nav-item my-0">
            <button
              className="btn btn-info btn-block"
              onClick={this.props.onCreateContext}
            >
              <span className="font-weight-bold">Create a context</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default ToolBar;
