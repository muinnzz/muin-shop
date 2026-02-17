// ============================
// TROLI / CART
let cart = [];

function addToCart(name, price, payLink) {
  // Tambah item ke troli
  cart.push({ name, price, payLink });
  updateCartUI();
  showPopup(`Produk "${name}" ditambah ke troli 🛒`);
}

// Update UI troli
function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;

  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");
  if (cartList && cartTotal) {
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - RM${item.price} 
        <button onclick="removeFromCart(${index})" class="text-red-500 ml-2">Hapus</button>
      `;
      cartList.appendChild(li);
    });
    cartTotal.textContent = `Total: RM${total}`;
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  showPopup("Produk dihapus dari troli 🗑️");
}

// ============================
// POPUP / TOAST
function showPopup(msg) {
  const popup = document.getElementById('popup');
  popup.innerHTML = msg;
  popup.style.display = 'block';
  setTimeout(() => popup.style.display = 'none', 3000);
}

// ============================
// TOGGLE MODE GELAP / TERANG
function toggleMode() {
  document.body.classList.toggle('dark-mode');
}

// ============================
// DAFTAR PRODUK
const produkList = [];
for (let i = 1; i <= 12; i++) {
  produkList.push({
    name: `Panel ${i}`,
    desc: `Servis digital ${i}`,
    price: i * 10,
    payLink: `https://wa.me/60123456789?text=Saya%20nak%20beli%20Panel%20${i}%20(RM${i*10})`,
    qr: `https://via.placeholder.com/150?text=QR+Panel+${i}`,
    img: `https://via.placeholder.com/300x200?text=Produk+${i}`
  });
}

// ============================
// RENDER PRODUK & SELECT OPTION
document.addEventListener('DOMContentLoaded', () => {
  const produkDiv = document.getElementById('produk-list');
  const productSelect = document.getElementById('product');

  produkList.forEach(p => {
    const card = document.createElement('div');
    card.className = "produk-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover rounded-xl mb-4">
      <h4 class="text-xl font-semibold mb-2">${p.name}</h4>
      <p class="mb-2">${p.desc}</p>
      <p class="text-2xl font-bold mb-4">RM${p.price}</p>
      <div class="flex gap-2">
        <button class="w-full neon-button" onclick="addToCart('${p.name}', ${p.price}, '${p.payLink}')">Beli Sekarang</button>
        <button class="w-full neon-button bg-gray-300 text-black" onclick="showQR('${p.qr}')">QR</button>
      </div>
    `;
    produkDiv.appendChild(card);

    // select option
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    productSelect.appendChild(opt);
  });

  // Buat daftar troli di order section
  const orderSection = document.getElementById('order');
  const cartHTML = document.createElement('div');
  cartHTML.innerHTML = `
    <h4>Troli:</h4>
    <ul id="cart-list"></ul>
    <p id="cart-total">Total: RM0</p>
    <button onclick="checkout()" class="neon-button mt-2 w-full">Checkout</button>
  `;
  orderSection.appendChild(cartHTML);
});

// ============================
// TAMPILKAN QR
function showQR(link) {
  const popup = document.getElementById('popup');
  popup.innerHTML = `<img src="${link}" alt="QR Code" class="w-40 h-40 mx-auto rounded">`;
  popup.style.display = 'block';
  setTimeout(() => popup.style.display = 'none', 5000);
}

// ============================
// ORDER FORM
document.getElementById('orderForm').addEventListener('submit', function(e){
  e.preventDefault();
  const nama = document.getElementById('name').value;
  const wa = document.getElementById('wa').value;
  const produk = document.getElementById('product').value;
  const note = document.getElementById('note').value;

  const price = produkList.find(p => p.name === produk)?.price || 0;

  const orderData = {
    name: nama,
    product: produk,
    price: price,
    whatsapp: wa,
    note: note,
    status: "Pending"
  };

  showReceipt(orderData);
});

// ============================
// RESIT / RECEIPT
function showReceipt(data) {
  alert(`
RESIT PEMBELIAN
Nama: ${data.name}
Produk: ${data.product}
Harga: RM${data.price}
Status: ${data.status}
  `);
}

// ============================
// LOGIN ADMIN (TESTING)
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('username').value;
  alert(`Login dicatat (testing)\nUsername: ${user}`);
});

// ============================
// CHECKOUT TROLI
function checkout() {
  if (cart.length === 0) {
    showPopup("Troli kosong! Tambah produk dulu 🛒");
    return;
  }
  cart.forEach(item => window.open(item.payLink, '_blank'));
  showPopup("Semua link pembayaran dibuka! 💸");
  cart = [];
  updateCartUI();
}
