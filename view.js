export default class View {
  constructor() {
    this.app = document.querySelector("#root");

    this.form = this._createElement("form");
    this.input = this._createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Add todo";

    this.submitButton = this._createElement("button");
    this.submitButton.textContent = "Add";

    this.form.append(this.input, this.submitButton);

    this.todoList = this._createElement("ul", "todo-list");
    this.app.append(this.form, this.todoList);

    this._tempTodoText = "";
    this._initLocalListeners();
  }

  _createElement(tag, className) {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    return el;
  }

  _resetInput() {
    this.input.value = "";
  }

  _initLocalListeners() {
    this.todoList.addEventListener("input", e => {
      if (e.target.className === "editable") {
        this._tempTodoText = e.target.innerText;
      }
    });
  }

  createTodoItem(todo) {
    const li = this._createElement("li");
    li.id = todo.id;

    const checkbox = this._createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.complete;

    const span = this._createElement("span");
    span.classList.add("editable");
    span.contentEditable = true;

    if (todo.complete) {
      const s = document.createElement("s");
      s.textContent = todo.text;
      span.append(s);
    } else {
      span.textContent = todo.text;
    }

    const deleteBtn = this._createElement("button", "delete");
    deleteBtn.textContent = "Delete";

    li.append(checkbox, span, deleteBtn);
    return li;
  }

  render(todos) {
    const existingItems = Array.from(this.todoList.children).filter(
      item => item.tagName === "LI"
    );
    const currentIds = todos.map(todo => todo.id);

    // Remove deleted items
    existingItems.forEach(item => {
      const id = parseInt(item.id);
      if (!currentIds.includes(id)) {
        item.remove();
      }
    });

    // Add or update items
    todos.forEach(todo => {
      let li = this.todoList.querySelector(`[id="${todo.id}"]`);

      // Add new item
      if (!li) {
        li = this.createTodoItem(todo);
        this.todoList.append(li);
      } else {
        // Update existing item
        const span = li.querySelector("span");
        const checkbox = li.querySelector("input[type='checkbox']");
        if (span && document.activeElement !== span) {
          if (todo.complete) {
            const s = document.createElement("s");
            s.textContent = todo.text;
            span.innerHTML = "";
            span.append(s);
          } else {
            span.textContent = todo.text;
          }
        }
        if (checkbox) checkbox.checked = todo.complete;
      }
    });

    // If list is empty, show message
    if (todos.length === 0 && !this.todoList.querySelector("p")) {
      const p = this._createElement("p");
      p.textContent = "Nothing to do!";
      this.todoList.append(p);
    } else {
      const message = this.todoList.querySelector("p");
      if (message) message.remove();
    }
  }

  bindAddTodo(handler) {
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      if (this.input.value) {
        handler(this.input.value);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", e => {
      if (e.target.className === "delete") {
        const id = parseInt(e.target.parentElement.id);
        handler(id);
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", e => {
      if (e.target.type === "checkbox") {
        const id = parseInt(e.target.parentElement.id);
        handler(id);
      }
    });
  }

  bindEditTodo(handler) {
    this.todoList.addEventListener("focusout", e => {
      if (this._tempTodoText) {
        const id = parseInt(e.target.parentElement.id);
        handler(id, this._tempTodoText);
        this._tempTodoText = "";
      }
    });
  }
}
