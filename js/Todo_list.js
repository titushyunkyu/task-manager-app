let todo = JSON.parse(localStorage.getItem("todo")) || [];
let classNames = JSON.parse(localStorage.getItem("classNames")) || {};
let draggedItem = null;

function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.getAttribute("data-id"));
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(event, droppedOverItemId, childIndex) {
    event.preventDefault();
    const draggedItemId = event.dataTransfer.getData("text/plain");
    const droppedOverItem = event.target.closest('.todo-container');
    if (!droppedOverItem || draggedItemId === droppedOverItemId) {
        return;
    }
    const draggedItemIndex = todo.findIndex(task => task.id === draggedItemId);
    const droppedOverItemIndex = todo.findIndex(task => task.id === droppedOverItemId);
    if (draggedItemIndex < 0 || droppedOverItemIndex < 0) {
        return;
    }
    const [removed] = todo.splice(draggedItemIndex, 1);
    todo.splice(droppedOverItemIndex, 0, removed);
    saveToLocalStorage();
    displayTasks();
}

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
            id: Date.now() + Math.random().toString(16)
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
            container.classList.add("todo-container");
            container.setAttribute("draggable", true);
            container.setAttribute("data-id", item.id);

            container.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${item.disabled ? "checked" : ""} onchange="toggleTask('${item.id}')">
                <p class="${item.disabled ? "task-completed" : ""}">${item.text}</p>
                <button class="deletebtn" onclick="deleteTask('${item.id}')"><i class="fa-regular fa-trash-can"></i></button>
            `;

            container.addEventListener('dragstart', handleDragStart);
            container.addEventListener('dragover', handleDragOver);
            container.addEventListener('drop', function(e) { handleDrop(e, item.id, i); });

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
