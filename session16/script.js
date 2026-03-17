const form = document.querySelector("form")
const fullName = document.getElementById("fullName")
const email = document.getElementById("email")
const dob = document.getElementById("dateOfBirth")
const position = document.getElementById("position")
const tableBody = document.querySelector("tbody")
const badge = document.querySelector(".badge")
const footer = document.querySelector(".footer span")
const headerTitle = document.querySelector(".header h1")

let employees = []
let editId = null
function formatDate(date){
    const d = new Date(date)

    const day = String(d.getDate()).padStart(2,"0")
    const month = String(d.getMonth()+1).padStart(2,"0")
    const year = d.getFullYear()

    return `${day}/${month}/${year}`
}

function validate(name,emailValue,dobValue,positionValue){

    if(!name || !emailValue || !dobValue || !positionValue){
        alert("Vui lòng nhập đầy đủ thông tin")
        return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailRegex.test(emailValue)){
        alert("Email không đúng định dạng")
        return false
    }

    return true
}
function renderEmployees(){

    tableBody.innerHTML=""

    employees.forEach(emp =>{

        const row = `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.dob}</td>
            <td>${emp.position}</td>
            <td>
                <button onclick="editEmployee(${emp.id})">Sửa</button>
                <button onclick="deleteEmployee(${emp.id})">Xóa</button>
            </td>
        </tr>
        `
        tableBody.innerHTML += row
    })
    updateStats()
}
function updateStats(){
    badge.textContent = employees.length + " nhân viên"
    footer.textContent =
        "Tổng số nhân viên: " + employees.length
}
function resetForm(){
    form.reset()
    editId = null
    headerTitle.textContent = "Quản Lý Nhân Viên"
}
form.addEventListener("submit",function(e){
    e.preventDefault()
    const name = fullName.value.trim()
    const emailValue = email.value.trim()
    const dobValue = dob.value
    const positionValue = position.value
    if(!validate(name,emailValue,dobValue,positionValue))
        return
    if(editId === null){
        const newEmployee = {
            id: employees.length
                ? employees[employees.length-1].id +1
                : 1,
            name:name,
            email:emailValue,
            dob:formatDate(dobValue),
            position:positionValue
        }
        employees.push(newEmployee)
    }else{
        const emp = employees.find(e=>e.id===editId)
        emp.name = name
        emp.email = emailValue
        emp.dob = formatDate(dobValue)
        emp.position = positionValue
    }
    renderEmployees()
    resetForm()
})
function editEmployee(id){
    const emp = employees.find(e=>e.id===id)
    fullName.value = emp.name
    email.value = emp.email
    const parts = emp.dob.split("/")
    dob.value = `${parts[2]}-${parts[1]}-${parts[0]}`
    position.value = emp.position
    editId = id
    headerTitle.textContent = "Chỉnh Sửa Nhân Viên"
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}
function deleteEmployee(id){
    const emp = employees.find(e=>e.id===id)
    const confirmDelete =
        confirm(`Bạn có chắc muốn xóa ${emp.name}?`)
    if(!confirmDelete) return
    employees = employees.filter(e=>e.id !== id)
    if(editId === id){
        resetForm()
    }
    renderEmployees()
}