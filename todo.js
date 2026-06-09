//==== Load Todos From Local Storage =====
let todoList =
JSON.parse(localStorage.getItem('todoList')) || [];

let currentFilter = 'all';


const inputElement =
document.querySelector('#todo-input');

const dateElement =
document.querySelector('#todo-date');

const containerElement =
document.querySelector('.todo-container');

const taskCountElement =
document.querySelector('#task-count');

displayItems();

//===== EVENT LISTENERS===========
inputElement.addEventListener(
    'keydown',
    handleEnterKey
);

function handleEnterKey(event){
    if(event.key === 'Enter'){
        addTodo();
    }
}

//========== MAIN FUNCTIONS==========
function addTodo() {

    const todoItem = inputElement.value.trim();
    const todoDate = dateElement.value;

    if(todoItem === ''){
        alert('Please enter a task');
        return;
    }

    if(todoDate === ''){
        alert('Please select a date');
        return;
    }

    todoList.push({
        item: todoItem,
        dueDate: todoDate,
        completed: false
    });

    updateUI();

    inputElement.value = '';
    dateElement.value = '';

    inputElement.focus();
}

function displayItems() {

    let newHtml = '';

    for(let i = 0; i < todoList.length; i++){

        const {
            item,
            dueDate,
            completed = false
        } = todoList[i];

        if(currentFilter === 'completed' && !completed){
            continue;
        }

        if(currentFilter === 'pending' && completed){
            continue;
        }

        newHtml += `
            <span class="${completed ? 'completed-task' : ''}">
                <input
                    type="checkbox"
                    ${completed ? 'checked' : ''}
                    onchange="toggleComplete(${i})"
                >
                ${item}
            </span>

            <span>${dueDate}</span>

            <button class="btn-edit"
            onclick="editTodo(${i})">
                Edit
            </button>

            <button class="btn-delete"
            onclick="deleteTodo(${i})">
            Delete
            </button>
        `;
    }
    
    containerElement.innerHTML = newHtml;
    
    updateTaskCount();
}

//========== TODO OPERATIONS=========
function deleteTodo(index){
    todoList.splice(index, 1);
    
    updateUI();
}

function toggleComplete(index){
    todoList[index].completed =
    !todoList[index].completed;

    updateUI();
}

function editTodo(index){

    let newTask = prompt(
        'Edit your task:',
        todoList[index].item
    );

    if(newTask === null){
        return;
    }

    newTask = newTask.trim();

    if(newTask === ''){
        alert('Task cannot be empty');
        return;
    }

    todoList[index].item = newTask;

    updateUI();
}

//======== HELPERS==============
function saveToLocalStorage(){
    localStorage.setItem(
        'todoList',
        JSON.stringify(todoList)
    );
}

function updateUI(){
    saveToLocalStorage();
    displayItems();
}

function updateTaskCount(){
    taskCountElement.innerText =
    `Total Tasks : ${todoList.length}`;
}

function setFilter(filter){
    currentFilter = filter;
    displayItems();
}

