const todos = [
 { id: 1, task: "Mua bánh chưng", done: false },
 { id: 2, task: "Dọn nhà đón Tết", done: false },
 { id: 3, task: "Gói bánh chưng", done: false },
 { id: 4, task: "Trang trí nhà cửa", done: false }
];

const todoList = document.getElementById("todoList");
function renderTodos(list){
    todoList.innerHTML = "";
    list.forEach(todo => {
        const div = document.createElement("div");
        div.textContent = todo.task;
        todoList.appendChild(div);
    });
}
if(localStorage.getItem("myTodos") === null){
    renderTodos(todos);
    localStorage.setItem("myTodos", JSON.stringify(todos));

}else{
    const data = JSON.parse(localStorage.getItem("myTodos"));
    renderTodos(data);
}