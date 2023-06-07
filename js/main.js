let textInput = document.getElementById('textInput');
let submitBtn = document.getElementById('submitBtn');
let tasksDiv = document.getElementById('tasksDiv')

if(localStorage.tasks){
    taskDataArray = JSON.parse(localStorage.tasks)
}else {
taskDataArray = [];
}

// Trigger Get Data From Local Storage 
getDataFromLocalStorage()

//Delete task
tasksDiv.addEventListener('click',(e)=>{
    if(e.target.classList.contains("taskDelete")){
        //remove Element From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
        //remove Element From page
        e.target.parentElement.remove();
    }
    //Task Element
    if(e.target.classList.contains("task")){
        //Toggle Completed From The Task
        toggleTaskStatusWith(e.target.getAttribute('data-id'))
        //toggle done class
        e.target.classList.toggle('done');

    }
})
textInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskToArray(textInput.value);
    textInput.value = "";
  }
});

submitBtn.addEventListener("click", () => {
  if (textInput.value) {
    addTaskToArray(textInput.value);
    textInput.value = "";
  }
});

function addTaskToArray(taskText) {
  // task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array
  taskDataArray.push(task);
  // Add Tasks to page
  addElementsToPageFrom(taskDataArray);
  // Add Tasks To Local Storage 
  addDataToLocalStorageFrom(taskDataArray);
}

function addElementsToPageFrom(taskDataArray) {
    //Empty Tasks Div
    tasksDiv.innerHTML = '';
    // looping on array of tasks
    taskDataArray.forEach((task)=>{
        //create task div  
        let div = document.createElement('div');
        let form = document.createElement('form');
        let taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.className = 'taskDelete';
        taskDeleteBtn.innerHTML = 'Delete';
        form.appendChild(document.createTextNode(task.title));
        div.className = 'task';
        div.setAttribute('data-id',task.id);
        div.appendChild(form);
        div.appendChild(taskDeleteBtn);
        //check if task is done 
        if(task.completed){
            div.className = 'task done';
        }
        //Add Task Div to Container
        tasksDiv.appendChild(div)
    })
}

function addDataToLocalStorageFrom(taskDataArray) {
    localStorage.setItem('tasks',JSON.stringify(taskDataArray))
}

function getDataFromLocalStorage(){
    let data = localStorage.getItem('tasks');
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
taskDataArray = taskDataArray.filter((task)=> task.id != taskId)
addDataToLocalStorageFrom(taskDataArray)
}


function toggleTaskStatusWith(taskId){
    for (let i = 0; i < taskDataArray.length; i++) {
        if(taskDataArray[i].id == taskId) {
            taskDataArray[i].completed == false ? taskDataArray[i].completed == true: taskDataArray[i].completed == false;

        }
    }
    addDataToLocalStorageFrom(taskDataArray)
}