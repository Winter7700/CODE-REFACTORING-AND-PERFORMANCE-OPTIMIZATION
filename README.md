*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: SANKET SAVLERAM HOLKAR

*INTERN ID*: CT04DF2639

*DOMAIN*: SOFTWARE DEVELOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTOSH

##🔹 1. Introduction
As part of this project, I selected a simple yet functional open-source to-do list web application for refactoring and performance optimization. The original project was found on GitHub from a public JavaScript MVC demo repository (though the original repo link was broken, I used the working structure and recreated the app locally).

The project uses plain JavaScript with no external libraries or frameworks. All logic was handled inside a single script.js file. While it was working, it was not well-structured for readability or maintainability, and it re-rendered the entire task list on every update — which was inefficient.

My goal was to improve the overall code organization, apply the Model-View-Controller (MVC) pattern, and optimize the rendering performance to make the app more efficient.

🔹 2. Project Setup
I started by running the original HTML file (index.html) in the browser to understand the app's behavior. It allowed users to:

Add new tasks

Edit tasks inline

Toggle complete status

Delete tasks

The project folder consisted of:

index.html (UI layout)

style.css (basic styling)

script.js (all logic combined)

I opened the folder using Visual Studio Code and served the app via Live Server for real-time testing.

🔹 3. Code Refactoring
The first major change was splitting script.js into 3 separate files, following the MVC design pattern:

model.js: Manages todo data and localStorage

view.js: Manages UI and DOM interactions

controller.js: Connects model and view and handles event logic

I updated the index.html to use modern JavaScript modules:

html
Copy
Edit
<script type="module" src="./controller.js"></script>
This allowed the use of import and export statements between files. After refactoring, the code became much more organized, and each component had a clear responsibility.

🔹 4. Performance Optimization
In the original code, every time a user added or edited a task, the entire <ul> list of tasks was removed and recreated. This was wasteful and could become a bottleneck with a large number of items.

I optimized the render() method in view.js to:

Only remove deleted tasks

Only add new ones

Update existing DOM elements if text or completion state changes

Show/hide the "Nothing to do!" message conditionally

This reduced the number of DOM operations and significantly improved performance during task updates.

Here’s an example of the improvement:

Before:

js
Copy
Edit
while (this.todoList.firstChild) {
  this.todoList.removeChild(this.todoList.firstChild);
}
todos.forEach(todo => {
  const li = this.createTodoItem(todo);
  this.todoList.append(li);
});
After:

js
Copy
Edit
todos.forEach(todo => {
  let li = this.todoList.querySelector(`[id="${todo.id}"]`);
  if (!li) {
    li = this.createTodoItem(todo);
    this.todoList.append(li);
  } else {
    // update existing element only
  }
});
This new method allows us to retain DOM elements and avoid full list redraws.

🔹 5. Visual Demo and Testing
Once the refactor and optimization were done, I tested all functionality again:

Adding tasks worked as expected.

Edits were retained even when switching tasks.

Completion toggles updated instantly.

Performance felt smoother, especially with 20+ tasks.

I confirmed that no console errors appeared and all event bindings worked correctly across files.

🔹 6. Challenges Faced
Initially, I had a bug due to not using type="module" in index.html.

I also had to debug a Cannot read properties of undefined (reading 'bind') error, which was fixed by using arrow functions for event handlers in the controller.

🔹 7. Conclusion
This project helped me understand the importance of code structure and how poor separation of concerns can impact readability and future maintenance. Using the MVC pattern made the codebase cleaner, and performance optimization helped reduce unnecessary DOM work, leading to a more efficient and scalable application.

I learned how to:

Modularize vanilla JS code

Use ES6 classes and modules

Optimize render logic

Improve app responsiveness through minimal DOM updates

Overall, the project was a success and is now ready for real-world usage or further extension.

📎 Deliverables
✅ Refactored Code (model.js, view.js, controller.js)

✅ Optimized render logic

✅ Working demo via index.html

✅ This Report
