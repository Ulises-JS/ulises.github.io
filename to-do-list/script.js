// Function to add a task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskTime = document.getElementById("taskTime");  // Get time input
    const taskList = document.getElementById("taskList");

    // Validation: Check if input is empty
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // Get the selected time and format it
    const time = taskTime.value ? taskTime.value : "No time set";  // Default if no time selected

    // Create a new task object
    const task = {
        taskName: taskInput.value,
        dueDate: taskDate.value || "No date",
        dueTime: time
    };

    // Get the tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Add the new task to the tasks array
    tasks.push(task);

    // Save the updated tasks array back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Display the updated tasks
    renderTasks();

    // Clear the input fields after task is added
    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";  // Clear time input as well
}

// Function to remove a task
function removeTask(index) {
    // Get the tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Remove the task at the specified index
    tasks.splice(index, 1);

    // Save the updated tasks back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Re-render the tasks
    renderTasks();
}

// Function to render tasks from localStorage
function renderTasks() {
    const taskList = document.getElementById("taskList");

    // Get tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Clear the current task list
    taskList.innerHTML = "";

    // Loop through tasks and create list items
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");

        taskItem.innerHTML = `
            <span>${task.taskName} (Due: ${task.dueDate}, Time: ${task.dueTime})</span>
            <button class="delete-btn" onclick="removeTask(${index})">X</button>
        `;

        taskItem.addEventListener("click", function () {
            taskItem.classList.toggle("completed");
        });

        taskList.appendChild(taskItem);
    });
}

// Render tasks when the page loads
window.onload = renderTasks;
