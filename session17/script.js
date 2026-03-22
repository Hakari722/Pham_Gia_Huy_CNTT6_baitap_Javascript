let initialTodos = [
    { id: 1, task: "Dọn dẹp nhà cửa", done: false },
    { id: 2, task: "Mua bánh chưng", done: false },
    { id: 3, task: "Trang trí cây đào", done: false },
    { id: 4, task: "Mua quần áo mới", done: false },
    { id: 5, task: "Chuẩn bị lì xì", done: false }
];
const todoList = document.getElementById("todoList");
let todos = JSON.parse(localStorage.getItem("myTodos"));
if (!todos) {
    todos = initialTodos;
    localStorage.setItem("myTodos", JSON.stringify(todos));
}
function renderTodos() {
    let html = "";

    todos.forEach((item, index) => {
        html += `
            <div class="todo-item ${item.done ? "done" : ""}" data-id="${item.id}">
                ${index + 1}. ${item.task}
            </div>
        `;
    });
    todoList.innerHTML = html;
}
todoList.addEventListener("click", function (e) {
    const todoItem = e.target.closest(".todo-item");
    if (!todoItem) return;
    const id = Number(todoItem.dataset.id);
    todos = todos.map(item => {
        if (item.id === id) {
            return { ...item, done: !item.done };
        }
        return item;
    });
    localStorage.setItem("myTodos", JSON.stringify(todos));
    renderTodos();
});
renderTodos();