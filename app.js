//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks
    filter.addEventListener('keyup', filterTasks)
}

//Get tasks from Local Storage
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        //Add a class
        li.className = 'collection-item';
        //Create text node and appent to li
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        //Add the class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = `<i class="fas fa-times"></i>`;
        //Append the link to li 
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function addTask(e) {

    e.preventDefault();

    if(taskInput.value === '') {
        alert('Add a task');
    }

    const li = document.createElement('li');
    //Add a class
    li.className = 'collection-item';
    //Create text node and appent to li
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    //Add the class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = `<i class="fas fa-times"></i>`;
    //Append the link to li 
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Store task in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear up the task input field
    taskInput.value = '';
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.matches('.delete-item')) {
        console.log('removing item');
        if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
    //Cleaner
    //taskList.innerHTML = '';
    //Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {

    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().includes(text)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}