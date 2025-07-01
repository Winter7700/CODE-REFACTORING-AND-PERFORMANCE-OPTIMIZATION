import Model from "./model.js";
import View from "./view.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Connect Model to View
    this.model.bindView(this.view);

    // Initial render
    this.view.render(this.model.todos);

    // Event bindings
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.view.bindEditTodo(this.handleEditTodo);
  }

  handleAddTodo = (text) => {
    this.model.addTodo(text);
  };

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id);
  };

  handleToggleTodo = (id) => {
    this.model.toggleTodo(id);
  };

  handleEditTodo = (id, updatedText) => {
    this.model.editTodo(id, updatedText);
  };
}

new Controller(new Model(), new View());
