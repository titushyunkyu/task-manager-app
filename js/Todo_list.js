let todo = JSON.parse(localStorage.getItem("todo")) || [];
let classNames = JSON.parse(localStorage.getItem("classNames")) || {};

document.addEventListener("DOMContentLoaded", function () {
    initializeClassNames();
    for (let i = 1; i <= 6; i++) {
        const addButton = document.getElementById(`addButton-${i}`);
        const todoInput = document.getElementById(`todoInput-${i}`);
        if (addButton && todoInput) {
            addButton.addEventListener("click", () => addTask(i));
            todoInput.addEventListener('keydown', function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    addTask(i);
                }
            });
        }
    }
    displayTasks();
});

function initializeClassNames() {
    for (let i = 1; i <= 5; i++) {
        const classNameInput = document.getElementById(`className-${i}`);
        if (classNameInput) {
            classNameInput.value = classNames[`className-${i}`] || '';
            classNameInput.addEventListener('change', () => {
                classNames[`className-${i}`] = classNameInput.value.trim();
                saveClassNamesToLocalStorage();
            });
        }
    }
}

function addTask(childIndex) {
    const todoInput = document.getElementById(`todoInput-${childIndex}`);
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask,
            disabled: false,
            childIndex: childIndex,
            id: Date.now() + Math.random().toString(16) // Unique identifier for each task
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function displayTasks() {
    for (let i = 1; i <= 5; i++) {
        const todoList = document.getElementById(`todoList-${i}`);
        todoList.innerHTML = "";
        todo.filter(task => task.childIndex === i).forEach((item) => {
            const container = document.createElement("div");
            container.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" ${item.disabled ? "checked" : ""} onchange="toggleTask('${item.id}')">
                <p class="${item.disabled ? "task-completed" : ""}">${item.text}</p>
                <button class="deletebtn" onclick="deleteTask('${item.id}')">
                <i class="fa-regular fa-trash-can"></i></button>
            </div>`;
            todoList.appendChild(container);
        });
    }
}

function toggleTask(id) {
    const taskIndex = todo.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        todo[taskIndex].disabled = !todo[taskIndex].disabled;
        saveToLocalStorage();
        displayTasks();
    }
}

function deleteTask(id) {
    todo = todo.filter(task => task.id !== id);
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

function saveClassNamesToLocalStorage() {
    localStorage.setItem("classNames", JSON.stringify(classNames));
}
