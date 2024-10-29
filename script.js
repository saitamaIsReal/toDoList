document.getElementById("add-todo").addEventListener("click", function () {
  const title = document.getElementById("todo-title").value;
  const description = document.getElementById("todo-description").value;

  if (title === "" || description === "") {
    alert("Please fill in both fields.");
    return;
  }

  addTaskToList(title, description, "to-do-list");

  // Eingabefelder leeren
  document.getElementById("todo-title").value = "";
  document.getElementById("todo-description").value = "";
});

function addTaskToList(title, description, listId) {
  const list = document.getElementById(listId);
  const taskItem = document.createElement("li");
  taskItem.classList.add("todo-item");

  taskItem.innerHTML = `
        <div>
            <span class="task-title">${title}</span>
            <p>${description}</p>
        </div>
        <div class="task-actions">
            <button onclick="deleteTask(this)">🗑️</button>
            <button class="complete" onclick="toggleTaskCompletion(this)">✔️</button>
        </div>
    `;

  list.appendChild(taskItem);
}

function deleteTask(button) {
  const taskItem = button.closest(".todo-item");
  taskItem.remove();
}

function toggleTaskCompletion(button) {
  const taskItem = button.closest(".todo-item");
  const currentList = taskItem.parentElement.id;

  // Wenn die Aufgabe in der To-Do-Liste ist, verschiebe sie zur Completed-Liste und umgekehrt
  if (currentList === "to-do-list") {
    document.getElementById("completed-list").appendChild(taskItem);
    taskItem.classList.add("completed");
  } else {
    document.getElementById("to-do-list").appendChild(taskItem);
    taskItem.classList.remove("completed");
  }
}

// Funktion zum Umschalten zwischen den Tabs
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

  // Tab-Buttons hervorheben
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document
    .querySelector(`.tab[onclick="showTab('${tabName}')"]`)
    .classList.add("active");
}
