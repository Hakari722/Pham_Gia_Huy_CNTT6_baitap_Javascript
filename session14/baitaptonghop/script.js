const products = [
    { id: 1, name: "Bánh Chưng", price: 150000, img: "/img/banhchung.webp" },
    { id: 2, name: "Giò Lụa", price: 180000, img: "/img/giolua.jpg" },
    { id: 3, name: "Cành Đào", price: 500000, img: "/img/canhdao.webp" },
    { id: 4, name: "Mứt Tết", price: 120000, img: "/img/muttet.webp" },
    { id: 5, name: "Lì Xì May Mắn", price: 20000, img: "/img/lixi.webp" },
    { id: 6, name: "Dưa Hấu Khắc Chữ", price: 60000, img: "/img/duahau.jpg" }
];
let productList = document.getElementById("product-list");
let cartList = document.getElementById("cart-list");
let totalPriceElement = document.getElementById("total-price");
let total = 0;
function formatMoney(number) {
    return number.toLocaleString("vi-VN") + "đ";
}
function renderProducts() {
    productList.innerHTML = "";

    products.forEach(function(product) {
        let div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${formatMoney(product.price)}</p>
            <button class="btn-add" data-id="${product.id}">
                Thêm vào giỏ
            </button>
        `;

        productList.appendChild(div);
    });
}
function addToCart(productId) {
    let product = products.find(p => p.id == productId);
    if (!product) return;
    let emptyMsg = cartList.querySelector(".empty-msg");
    if (emptyMsg) emptyMsg.remove();
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="cart-item-name">${product.name}</span>
        <div>
            <span class="cart-item-price">${formatMoney(product.price)}</span>
            <button class="btn-remove">X</button>
        </div>
    `;
    let removeBtn = li.querySelector(".btn-remove");

    removeBtn.addEventListener("click", function() {
        total -= product.price;
        totalPriceElement.innerText = formatMoney(total);
        li.remove();
        if (cartList.children.length === 0) {
            cartList.innerHTML = `<li class="empty-msg">Chưa có món nào...</li>`;
        }
    });

    cartList.appendChild(li);
    total += product.price;
    totalPriceElement.innerText = formatMoney(total);
}
productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-add")) {
        let id = event.target.getAttribute("data-id");
        addToCart(id);
    }
});
renderProducts();