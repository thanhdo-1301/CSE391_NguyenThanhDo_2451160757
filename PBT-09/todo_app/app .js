const todoInput=document.querySelector("#todoInput");
const addBtn=document.querySelector("#addBtn");
const todoList=document.querySelector("#todoList");
const count=document.querySelector("#count");
const clearCompleted=document.querySelector("#clearCompleted");

let todos=JSON.parse(
localStorage.getItem("todos")
)||[];

let currentFilter="all";


render();

addBtn.addEventListener("click",addTodo);

todoInput.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        addTodo();
    }
});


document.querySelector(".filters")
.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("filter"))
        return;

    document
    .querySelectorAll(".filter")
    .forEach(btn=>btn.classList.remove("active"));

    e.target.classList.add("active");

    currentFilter=e.target.dataset.filter;

    render();

});


todoList.addEventListener("click",(e)=>{

    const li=e.target.closest("li");

    if(!li) return;

    const id=Number(li.dataset.id);

    if(e.target.classList.contains("delete")){

        todos=todos.filter(
            todo=>todo.id!==id
        );

    }

    else if(
        e.target.classList.contains("todo-text")
    ){

        todos=todos.map(todo=>{

            if(todo.id===id){

                todo.completed=
                !todo.completed;

            }

            return todo;

        });

    }

    saveAndRender();

});


todoList.addEventListener("dblclick",(e)=>{

    if(
        !e.target.classList.contains(
            "todo-text"
        )
    ) return;

    const li=e.target.closest("li");

    const id=Number(li.dataset.id);

    const input=document.createElement("input");

    input.className="edit-input";

    input.value=e.target.textContent;

    e.target.replaceWith(input);

    input.focus();

    input.addEventListener("keypress",(ev)=>{

        if(ev.key==="Enter"){

            todos=todos.map(todo=>{

                if(todo.id===id){

                    todo.text=input.value.trim();
                }

                return todo;

            });

            saveAndRender();

        }

    });

});


clearCompleted.addEventListener("click",()=>{

    todos=todos.filter(
        todo=>!todo.completed
    );

    saveAndRender();

});


function addTodo(){

    const text=todoInput.value.trim();

    if(text==="") return;

    todos.push({

        id:Date.now(),
        text:text,
        completed:false

    });

    todoInput.value="";

    saveAndRender();

}


function render(){

    todoList.textContent="";

    let filtered=todos;

    if(currentFilter==="active"){

        filtered=todos.filter(
            todo=>!todo.completed
        );

    }

    if(currentFilter==="completed"){

        filtered=todos.filter(
            todo=>todo.completed
        );

    }


    filtered.forEach(todo=>{

        const li=document.createElement("li");

        li.className="todo-item";

        if(todo.completed){

            li.classList.add(
                "completed"
            );
        }

        li.dataset.id=todo.id;


        const span=
        document.createElement("span");

        span.className=
        "todo-text";

        span.textContent=
        todo.text;


        const button=
        document.createElement("button");

        button.className=
        "delete";

        button.textContent="❌";


        li.append(
            span,
            button
        );

        todoList.append(li);

    });


    updateCount();

}


function updateCount(){

    const left=todos.filter(
        todo=>!todo.completed
    ).length;

    count.textContent=
    `${left} items left`;

}


function saveAndRender(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

    render();

}