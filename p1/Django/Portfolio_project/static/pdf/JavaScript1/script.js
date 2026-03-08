const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";

    // Select elements
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("label span");
    const deleteBtn = li.querySelector(".delete-btn");

    //  Function to update counters inside the list only
    function updateCounters() {
        const completedTasks = listContainer.querySelectorAll("li.completed").length;
        const uncompletedTasks = listContainer.querySelectorAll("li:not(.completed)").length;
        completedCounter.textContent = completedTasks;
        uncompletedCounter.textContent = uncompletedTasks;
    }

    // Checkbox click
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // Edit button click
    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null && update.trim() !== "") {
            taskSpan.textContent = update.trim();
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // Delete task
    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });

    // Initial update
    updateCounters();
}
