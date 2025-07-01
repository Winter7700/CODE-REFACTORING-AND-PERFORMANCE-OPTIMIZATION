export default class Model {
  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  bindView(view) {
    this.view = view;
  }

  _commit(todos) {
    this.todos = todos;
    localStorage.setItem("todos", JSON.stringify(todos));
    this.view.render(todos);
  }

  addTodo(text) {
    const todo = {
      id: Date.now(),
      text,
      complete: false,
    };
    this._commit([...this.todos, todo]);
  }

  deleteTodo(id) {
    this._commit(this.todos.filter(todo => todo.id !== id));
  }

  toggleTodo(id) {
    this._commit(
      this.todos.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  editTodo(id, newText) {
    this._commit(
      this.todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }
}
