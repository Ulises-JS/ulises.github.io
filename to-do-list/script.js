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

    // Create a new list item (task)
    const taskItem = document.createElement("li");

    // Set the task content, including the task name, due date, and time
    taskItem.innerHTML = `
        <span>${taskInput.value} (Due: ${taskDate.value || "No date"}, Time: ${time})</span>
        <button class="delete-btn" onclick="removeTask(this)">X</button>
    `;

    // Toggle completion on click (cross out the task text)
    taskItem.addEventListener("click", function () {
        taskItem.classList.toggle("completed");
    });

    // Add the new task to the task list
    taskList.appendChild(taskItem);

    // Clear the input fields after task is added
    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";  // Clear time input as well
}

// Function to remove a task when the delete button is clicked
function removeTask(button) {
    button.parentElement.remove();
}
