let taskList = [];
localStorage.getItem("list")
  ? (taskList = JSON.parse(localStorage.getItem("list")))
  : (taskList = []);

let history = [];
localStorage.getItem("history")
  ? (history = JSON.parse(localStorage.getItem("history")))
  : (history = []);

function addTask() {
  const taskToAdd = document.getElementById("task").value;
  if (!taskToAdd.trim()) return; 

  const task = {
    id: Date.now(),
    name: taskToAdd,
    completed: false,
  };

  taskList = JSON.parse(localStorage.getItem("list")) || [];
  taskList.push(task);
  localStorage.setItem("list", JSON.stringify(taskList));

  renderTasks();
}

function convertTimeStamp(timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = ("0" + date.getSeconds()).slice(-2);
  return `${date.toDateString()} ${hours}:${minutes}:${seconds}`;
}

function renderTasks() {
    let taskList = JSON.parse(localStorage.getItem("list")) || [];
    const taskContainer = document.getElementById("taskContainer");
  
    taskContainer.innerHTML = "";
    
    taskList
      .slice()
      .reverse() 
      .forEach((task) => {
        taskContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="task">
            <p>${convertTimeStamp(task.id)}</p>
            <p>${task.name}</p>
            <p>${task.completed ? "&#x2705;" : "&#9203;"}</p>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            <button class="complete" onclick="completeTask(${task.id})">Complete</button>
          </div>
          `
        );
      });
  }
  
  function renderHistory() {
    let historyList = JSON.parse(localStorage.getItem("history")) || [];
    const historyContainer = document.getElementById("historyContainer");
  
    historyContainer.innerHTML = "";
  
    historyList
      .slice()
      .reverse() 
      .forEach((task) => {
        historyContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="historytask">
            <p>${convertTimeStamp(task.id)}</p>
            <p>${task.name}</p>
            <p>${task.completed ? "&#x2705;" : "&#10060;"}</p>
          </div>
          `
        );
      });
  }
  

function deleteTask(id) {
  let taskList = JSON.parse(localStorage.getItem("list")) || [];
  let historyList = JSON.parse(localStorage.getItem("history")) || [];

  const deletedTask = taskList.find((task) => task.id === Number(id));
  if (deletedTask) {
    historyList.push(deletedTask);
    localStorage.setItem("history", JSON.stringify(historyList));
  }

  taskList = taskList.filter((task) => task.id !== Number(id));
  localStorage.setItem("list", JSON.stringify(taskList));

  renderTasks();
  renderHistory();
}

function completeTask(id) {
  let taskList = JSON.parse(localStorage.getItem("list")) || [];
  let historyList = JSON.parse(localStorage.getItem("history")) || [];

  const completedTask = taskList.find((task) => task.id === Number(id));
  if (completedTask) {
    const completedCopy = { ...completedTask, completed: true }; 
    historyList.push(completedCopy);
    localStorage.setItem("history", JSON.stringify(historyList));
  }

  taskList = taskList.filter((task) => task.id !== Number(id));
  localStorage.setItem("list", JSON.stringify(taskList));

  renderTasks();
  renderHistory();
}

var input = document.getElementById("task");

if (input) {
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
}

function clearStorage() {
  localStorage.clear();
  taskList = [];
  history = [];
  renderTasks();
  renderHistory();
}

addEventListener("DOMContentLoaded", () => {
  renderTasks();
  renderHistory();
});
