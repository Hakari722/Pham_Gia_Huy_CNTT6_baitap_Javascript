function safeParse(key, defaultValue) {
    try {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch {
        return defaultValue;
    }
}
let products = safeParse("products", []);
let idCounter = safeParse("idCounter", 1);
let editId = null;
const form = document.getElementById("productForm");
const nameInput = document.getElementById("productName");
const categoryInput = document.getElementById("productCategory");
const priceInput = document.getElementById("productPrice");
const quantityInput = document.getElementById("productQuantity");
const descInput = document.getElementById("productDescription");
const tableBody = document.getElementById("productTableBody");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const totalProductsEl = document.getElementById("totalProducts");
const totalValueEl = document.getElementById("totalValue");
const totalQuantityEl = document.getElementById("totalQuantity");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
function formatMoney(num) {
    return num.toLocaleString("vi-VN") + " VNĐ";
}
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("idCounter", JSON.stringify(idCounter));
}
function validate() {
    let name = nameInput.value.trim();
    let category = categoryInput.value;
    let price = Number(priceInput.value);
    let quantity = Number(quantityInput.value);

    if (!name) return alert("Tên sản phẩm không được để trống");
    if (!category) return alert("Vui lòng chọn danh mục");
    if (price < 0) return alert("Giá phải >= 0");
    if (quantity < 0) return alert("Số lượng phải >= 0");

    return true;
}
function render(list = products) {
    tableBody.innerHTML = "";

    if (list.length === 0) {
        emptyState.style.display = "block";
        updateStats([]);
        return;
    }

    emptyState.style.display = "none";

    list.forEach(p => {
        tableBody.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>${formatMoney(p.price)}</td>
            <td style="color:${p.quantity < 10 ? 'red' : 'black'}">
                ${p.quantity}
            </td>
            <td title="${p.description || ""}">
                ${(p.description || "").slice(0, 20)}
                ${(p.description || "").length > 20 ? "..." : ""}
            </td>
            <td>
                <button onclick="editProduct(${p.id})">✏️</button>
                <button onclick="deleteProduct(${p.id})">🗑️</button>
            </td>
        </tr>
        `;
    });

    updateStats(products);
}
function updateStats(list) {
    totalProductsEl.textContent = list.length;
    let totalValue = list.reduce((sum, p) => sum + p.price * p.quantity, 0);
    let totalQuantity = list.reduce((sum, p) => sum + p.quantity, 0);
    totalValueEl.textContent = formatMoney(totalValue);
    totalQuantityEl.textContent = totalQuantity;
}

// ====== RESET FORM ======
function resetForm() {
    form.reset();
    editId = null;

    formTitle.textContent = "Thêm Sản Phẩm Mới";
    submitBtn.textContent = " Thêm Sản Phẩm";
    cancelBtn.style.display = "none";
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    let product = {
        id: editId || idCounter++,
        name: nameInput.value.trim(),
        category: categoryInput.value,
        price: Number(priceInput.value),
        quantity: Number(quantityInput.value),
        description: descInput.value.trim()
    };
    if (editId) {
        products = products.map(p => p.id === editId ? product : p);
    } else {
        products.push(product);
    }
    saveData();
    render();
    resetForm();
});
function editProduct(id) {
    let p = products.find(x => x.id === id);
    nameInput.value = p.name;
    categoryInput.value = p.category;
    priceInput.value = p.price;
    quantityInput.value = p.quantity;
    descInput.value = p.description;

    editId = id;
    formTitle.textContent = "Chỉnh Sửa Sản Phẩm";
    submitBtn.textContent = " Cập Nhật";
    cancelBtn.style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function deleteProduct(id) {
    let p = products.find(x => x.id === id);
    if (!confirm(`Xóa "${p.name}"?`)) return;
    products = products.filter(x => x.id !== id);
    if (editId === id) resetForm();
    saveData();
    render();
}
document.getElementById("clearAllBtn").addEventListener("click", () => {
    if (!confirm(" Bạn có chắc muốn XÓA TẤT CẢ?")) return;
    products = [];
    idCounter = 1;
    localStorage.removeItem("products");
    localStorage.removeItem("idCounter");
    resetForm();
    render();
});
function applyFilter() {
    let keyword = searchInput.value.toLowerCase().trim();
    let category = filterCategory.value;
    let filtered = products.filter(p => {
        let matchText =
            p.name.toLowerCase().includes(keyword) ||
            (p.description || "").toLowerCase().includes(keyword);
        let matchCategory = category ? p.category === category : true;
        return matchText && matchCategory;
    });
    render(filtered);
}
searchInput.addEventListener("input", applyFilter);
filterCategory.addEventListener("change", applyFilter);
render();