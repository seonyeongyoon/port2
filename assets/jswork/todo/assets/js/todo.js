const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";  

function filterFn(toDo){
    return toDo.id === 1
}

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
        //모든 toDos가 'li'의 id와 같지 않을 때
        //parseInt 함수는 첫 번째 인자를 문자열로 변환하고 파싱하고,  그 문자열을 파싱하여 정수나 NaN을 리턴합니다
    });
    
    toDos = cleanToDos
    saveToDos();
    //filter : forEach에서 함수를 실행하는 것 처럼 각각의 item과 같이 실행.
    //filter : array의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만 가지고 새로운 array를 만듦.
    //cleanToDos와 filter : filterFn이 체크가 된 아이템들의 array를 줌.
}


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //JSON : objec -> string , string -> object로 변환해줌
    //JSON.stringify : JS Object를 string으로 바꿔줌
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}



function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            //forEach : 기본적으로 함수를 실행하는데 array에 담겨있는 것들 각 각 한번씩 함수를 실행시켜 주는 것.
            //array를 위한 function
            paintToDo(toDo.text); 
        });
    } 
}    

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();