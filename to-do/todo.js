let inputTask = document.querySelector("#todo-input");
let listContainer = document.querySelector(".task-list");
let addBtn = document.querySelector(".add-btn");
let errorText = document.querySelector(".error");

let addTask = () => {
    if(inputTask.value.trim() == "") {
        errorText.style.visibility = "visible";
    } else {
        errorText.style.visibility = "hidden";
        let newTask = document.createElement("li");
        newTask.textContent = inputTask.value;
        listContainer.appendChild(newTask);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        newTask.appendChild(span);
    }
    inputTask.value = ""
    saveTask();
    checkEmpty();
}

let saveTask = () => {
    const p = listContainer.querySelector("p");
    if (p) p.remove();
    localStorage.setItem("data", listContainer.innerHTML);
}

let loadTask = () => {
    listContainer.innerHTML= localStorage.getItem("data");
}

let checkEmpty = () => {
    if(listContainer.querySelectorAll("li").length === 0) {
        if(!listContainer.querySelector("p")) {
            let para = document.createElement("p");
            para.style.textAlign = "center";
            para.textContent = "No tasks available";
            listContainer.appendChild(para);
        }
    } else {
        let para = document.querySelector("p");
        if(para) para.remove();
    }
}

addBtn.addEventListener("click", addTask);

listContainer.addEventListener("click", (e) => {
    if(e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveTask();
        checkEmpty();
    } else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveTask();
        checkEmpty();
    }
});

loadTask();
checkEmpty();

// localStorage.clear();