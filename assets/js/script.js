const container = document.querySelector(".tasks tbody");
const form = document.querySelector("#taskForm");
const taskTilte = document.querySelector("#taskForm #taskTitle")
const updateTitlevar = document.querySelector("#updatTitle")
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

const read = () => {
    container.innerHTML = ""; // you can put it in add function after push methode
    tasks.forEach((task) => {
        container.innerHTML += `
    <tr class="${task.status ? "completed" : ""}">
    <td>${task.id}</td>
    <td>${task.title}</td>
    <td><button onclick="editStatus(${task.id})">Edit Status</button><button onclick="editTitle(${task.id})">Edit Title</button><button onclick="deleteTask(${task.id})">Delete Task</button></td>
    </tr>
        `
    });
}
// start add a new task function
const add = (event) => {
    event.preventDefault()
    if (taskTilte.value != "") {
        let task = {
            id: (tasks.length != 0) ? (tasks[tasks.length - 1].id + 1) : 1,
            title: taskTilte.value,
            status: false,
        };
        tasks.push(task);
        taskTilte.value = "";
        localStorage.setItem("tasks", JSON.stringify(tasks))
        read();
    }
    else {
        window.alert("You can not add empty task title!")
    }
}

form.addEventListener("submit", (event) => add(event));
read();
// end  start add a new task function

// start edit status task function

const editStatus = (id) => {
    tasks[id - 1].status = !tasks[id - 1].status
    localStorage.setItem("tasks", JSON.stringify(tasks))
    read()
}
// end edit status task function

// start edit title task function
const editTitle = (id) => {
    let counter = id - 1
    let oldTaskTitle = tasks[id - 1].title
    tasks[id - 1].title = `<input type="text" value="${oldTaskTitle}" id="updatTitle"><button onclick="updateTitle(updatTitle.value , ${counter})">Update</button>`
    localStorage.setItem("tasks", JSON.stringify(tasks))
    read()
    tasks[id - 1].title = oldTaskTitle
}
const updateTitle = (value, id) => {
    tasks[id].title = value;
    tasks[id].status = false
    localStorage.setItem("tasks", JSON.stringify(tasks))
    read()
}
// end edit title task function

// start delelte task function

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id != id)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    read()
}

