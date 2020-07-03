import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CreateContextModal from "./CreateContextModal";
import CreateTodoModal from "./CreateEditTodoModal/CreateTodoModal";
import EditTodoModal from "./CreateEditTodoModal/EditTodoModal";
import Todo from "./Todo";
import ToolBar from "./ToolBar";
import DeletedTodosSection from "./DeletedTodosSection";
import setProperStatus from "./setProperStatus";
import { TodosObserver } from "./todoManager";
import { ContextObserver } from "./contextManager";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      contexts: [],
      currentContext: "general",
      showCreateContextModal: false,
      showCreateTodoModal: false,
      showEditTodoModal: false,
      dataForEdit: {},
    };
    this.toolBar = React.createRef();
    this.wrapper = React.createRef();
    this.setCurrentContext = this.setCurrentContext.bind(this);
    this.showHideContextModal = this.showHideContextModal.bind(this);
    this.showHideCreateTodoModal = this.showHideCreateTodoModal.bind(this);
    this.showHideEditTodoModal = this.showHideEditTodoModal.bind(this);
    this.setPaddingTop = this.setPaddingTop.bind(this);
  }

  setCurrentContext(name) {
    this.setState({ currentContext: name });
  }

  showHideContextModal() {
    this.setState({
      showCreateContextModal: !this.state.showCreateContextModal,
    });
  }

  showHideCreateTodoModal() {
    this.setState({
      showCreateTodoModal: !this.state.showCreateTodoModal,
    });
  }

  showHideEditTodoModal(data) {
    this.setState({ dataForEdit: data });
    this.setState({
      showEditTodoModal: !this.state.showEditTodoModal,
    });
  }

  setPaddingTop() {
    const toolBarHeight = this.toolBar.current.clientHeight;
    this.wrapper.current.style.paddingTop = `${toolBarHeight}px`;
  }

  componentDidMount() {
    this.setPaddingTop();

    TodosObserver.subscribe((todos) => this.setState({ todos: todos }));

    ContextObserver.subscribe((contexts) =>
      this.setState({ contexts: contexts })
    );
  }

  componentWillUnmount() {
    TodosObserver.unsubscribe((todos) => this.setState({ todos: todos }));

    ContextObserver.unsubscribe((contexts) => {
      this.setState({ contexts: contexts });
    });
  }

  render() {
    let todos = {
      delayed: [],
      today: [],
      pending: [],
      someday: [],
      concluded: [],
      deleted: [],
    };

    for (let todo of this.state.todos) {
      if (
        todo.context === this.state.currentContext ||
        todo.status === "deleted"
      ) {
        todo = setProperStatus(todo);
        todos[todo.status].push(
          <Todo data={todo} key={todo.id} onEdit={this.showHideEditTodoModal} />
        );
      }
    }

    let sections = [];

    for (let todoStatus in todos) {
      if (todoStatus !== "deleted" && todos[todoStatus].length > 0) {
        sections.push(
          <Col as="section" key={todoStatus} xs={12} sm={6} md={4} lg={3}>
            {todos[todoStatus].length > 0 && (
              <p className="h3 font-weight-bold text-capitalize">
                {todoStatus}
              </p>
            )}
            {todos[todoStatus]}
          </Col>
        );
      }
    }

    return (
      <div className="App" ref={this.wrapper}>
        {this.state.showCreateContextModal && (
          <CreateContextModal
            show={this.state.showCreateContextModal}
            contexts={this.state.contexts}
            onClose={this.showHideContextModal}
            onSave={this.setCurrentContext}
          />
        )}
        {this.state.showCreateTodoModal && (
          <CreateTodoModal
            show={this.state.showCreateTodoModal}
            contexts={this.state.contexts}
            currentContext={this.state.currentContext}
            todos={this.state.todos}
            onClose={this.showHideCreateTodoModal}
          />
        )}
        {this.state.showEditTodoModal && (
          <EditTodoModal
            data={this.state.dataForEdit}
            show={this.state.showEditTodoModal}
            contexts={this.state.contexts}
            currentContext={this.state.currentContext}
            todos={this.state.todos}
            onClose={this.showHideEditTodoModal}
          />
        )}
        <ToolBar
          ref={this.toolBar}
          contexts={this.state.contexts}
          contextName={this.state.currentContext}
          changeContext={this.setCurrentContext}
          showHideTodoModal={this.showHideCreateTodoModal}
          showHideContextModal={this.showHideContextModal}
          onShowMenu={this.setPaddingTop}
        />
        <Row as="main" className="mx-0">
          {this.state.currentContext === "deleted" ? (
            <DeletedTodosSection
              todos={this.state.todos}
              restoreTodo={this.restoreTodo}
            />
          ) : (
            sections
          )}
        </Row>
      </div>
    );
  }
}

export default App;
