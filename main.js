let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let div = document.querySelector(".tasks");

let arryoftaske = [];


if (localStorage.getItem("tasks")) {
    arryoftaske = JSON.parse(localStorage.getItem("tasks"));
}


getDataFromLocolStorge();


submit.onclick = function (){
    if(input.value !== ""){
        addTaskToArry(input.value);
        input.value= "";
    }
}


div.addEventListener("click", (e)=>{
    if (e.target.classList.contains("del")) {
        deleteTaskeWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){
        toggleStausTaskWith(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})

function addTaskToArry(taskText){
const task ={
    id: Date.now(),
    title:taskText,
    completed: false,
};
arryoftaske.push(task);
addTaskeToPage(arryoftaske);
addDateToLocalStorageFrom(arryoftaske);
}
function addTaskeToPage(arryoftaske){
    div.innerHTML ="";
    arryoftaske.forEach((task) => {
        let newdiv = document.createElement("div");
        newdiv.className="task";
        if (task.completed) {
        newdiv.className="task done";
        }
        newdiv.setAttribute("data-id",task.id);
        newdiv.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        newdiv.appendChild(span);
        div.appendChild(newdiv);
    })
}

function addDateToLocalStorageFrom(arryoftaske){
    window.localStorage.setItem("tasks", JSON.stringify(arryoftaske));
};
function getDataFromLocolStorge(){
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        addTaskeToPage(tasks);
    }
}
function deleteTaskeWith(taskId){
    arryoftaske = arryoftaske.filter((task) => task.id != taskId); 
    addDateToLocalStorageFrom(arryoftaske);
}
function toggleStausTaskWith(taskId){
    for(let i = 0; i < arryoftaske.length; i++){
            if(arryoftaske[i].id == taskId){
            arryoftaske[i].completed == false ? (arryoftaske[i].completed = true) : (arryoftaske[i].completed = false);
        }
    addDateToLocalStorageFrom(arryoftaske);
    }
};