let task=document.getElementById("task");
let taskBtn=document.getElementById("taskBtn");
let taskContainer=document.getElementById("taskContainer");
let editorDiv=document.getElementById("editor");
let newTask=document.getElementById("updatedTask");
let updateTaskBtn=document.getElementById("updateTaskBtn");
let closeTaskBtn=document.getElementById("closeTaskPopup");

let taskArray=[];

taskBtn.addEventListener("click",()=>{
    if(task.value!=""){
        taskArray.push({task: task.value, status: false});
        loadTask();
        task.value=""
    }
})

function loadTask(){
    let html="";
    let color=""
    taskArray.forEach((data,index)=>{
        if(data.status)
        color="#00D84A"
        else
        color="#DDD101"

        html+=`<div class="bg-[#3944F7] flex flex-col items-center w-56 py-4 px-2 rounded-lg text-white gap-3">
        <p>${data.task}</p>
        <p>Status: ${data.status? "Completed": "Pending"}</p>
        <button onclick="removeTask(${index})" class="bg-white text-black px-3 py-1 rounded-lg w-[80%]">Remove</button>
        <button onclick="setStatus(${index})" class="bg-[${color}] px-3 py-1 rounded-lg w-[80%]">${data.status? "Mark Pending": "Mark Completed"}</button>
        <button onclick="openTaskUpdater(${index})" class="bg-white text-black px-3 py-1 rounded-lg w-[80%]">Edit Task</button>
    </div>`
    });
    taskContainer.innerHTML=html;
}

function setStatus(index){
    if(taskArray[index].status)
    taskArray[index].status=false
    else
    taskArray[index].status=true

    loadTask();
}

function removeTask(index){
    taskArray=taskArray.filter((data)=>data.task!=taskArray[index].task);
    loadTask();
}

function openTaskUpdater(index){
    newTask.value=taskArray[index].task;
    editorDiv.index=index;
    editorDiv.classList.remove("hidden");

}

function closePopup(){
    editorDiv.classList.add("hidden");
}

updateTaskBtn.addEventListener("click",()=>{
    let index=editorDiv.index;
    taskArray[index].task=newTask.value;
    closePopup();
    loadTask();
})

closeTaskBtn.addEventListener("click",()=>{
    closePopup();
})