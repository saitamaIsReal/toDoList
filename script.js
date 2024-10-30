document.addEventListener("DOMContentLoaded", loadTasksFromStorage);

document.getElementById("add-todo").addEventListener("click", function () {
  const title = document.getElementById("todo-title").value;
  const description = document.getElementById("todo-description").value;

  if (title === "" || description === "") {
    alert("Please fill in both fields.");
    return;
  }

  const task = { title, description, completed: false };
  addTaskToList(task);
  saveTaskToStorage(task);

  // Eingabefelder leeren
  document.getElementById("todo-title").value = "";
  document.getElementById("todo-description").value = "";
});

function addTaskToList(task) {
  const list = task.completed
    ? document.getElementById("completed-list")
    : document.getElementById("to-do-list");
  const taskItem = document.createElement("li");
  taskItem.classList.add("todo-item");
  if (task.completed) {
    taskItem.classList.add("completed");
  }

  taskItem.innerHTML = `
        <div>
            <span class="task-title">${task.title}</span>
            <p class="task-description">${task.description}</p>
        </div>
        <div class="task-actions">
            <button onclick="editTask(this, '${task.title}')">✏️</button>
            <button onclick="deleteTask(this, '${task.title}')">🗑️</button>
            <button class="complete" onclick="toggleTaskCompletion(this, '${task.title}')">✔️</button>
        </div>
    `;

  list.appendChild(taskItem);
}

function saveTaskToStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(button, title) {
  const taskItem = button.closest(".todo-item");
  taskItem.remove();
  removeTaskFromStorage(title);
}

function removeTaskFromStorage(title) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.title !== title);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function toggleTaskCompletion(button, title) {
  const taskItem = button.closest(".todo-item");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.title === title);

  if (task) {
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Aufgabe zwischen den Listen verschieben
  if (taskItem.parentElement.id === "to-do-list") {
    document.getElementById("completed-list").appendChild(taskItem);
    taskItem.classList.add("completed");
  } else {
    document.getElementById("to-do-list").appendChild(taskItem);
    taskItem.classList.remove("completed");
  }
}

function editTask(button, title) {
  const taskItem = button.closest(".todo-item");
  const taskTitleElement = taskItem.querySelector(".task-title");
  const taskDescriptionElement = taskItem.querySelector(".task-description");

  // Mach die Elemente editierbar
  taskTitleElement.contentEditable = true;
  taskDescriptionElement.contentEditable = true;
  taskTitleElement.focus(); // Setzt den Fokus auf das Titel-Element

  // Ändere den Bearbeiten-Button auf "Speichern"
  button.textContent = "💾";
  button.onclick = () => saveTaskEdit(button, title);
}

function saveTaskEdit(button, originalTitle) {
  const taskItem = button.closest(".todo-item");
  const taskTitleElement = taskItem.querySelector(".task-title");
  const taskDescriptionElement = taskItem.querySelector(".task-description");

  // Neue Werte holen
  const newTitle = taskTitleElement.textContent.trim();
  const newDescription = taskDescriptionElement.textContent.trim();

  // Speicher die neuen Werte in localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.title === originalTitle);
  if (task) {
    task.title = newTitle;
    task.description = newDescription;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Elemente wieder nicht editierbar machen
  taskTitleElement.contentEditable = false;
  taskDescriptionElement.contentEditable = false;

  // Ändere den Speichern-Button zurück auf "Bearbeiten"
  button.textContent = "✏️";
  button.onclick = () => editTask(button, newTitle);
}

function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToList);
}

function showTab(tabName) {
  const todoList = document.getElementById("to-do-list");
  const completedList = document.getElementById("completed-list");

  if (tabName === "completed") {
    todoList.style.display = "none";
    completedList.style.display = "block";
  } else {
    todoList.style.display = "block";
    completedList.style.display = "none";
  }

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document
    .querySelector(`.tab[onclick="showTab('${tabName}')"]`)
    .classList.add("active");
}
