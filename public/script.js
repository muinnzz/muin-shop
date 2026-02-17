// ============================
// SCRIPT.JS - Muin Shop Interaktif
// ============================

// Troli
let cart = [];

// ============================
// Fungsi Tambah ke Troli
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  showPopup(`Produk "${name}" ditambah ke troli 🛒`);
}

// Update tampilan troli
function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  if(cartCount){
    cartCount.textContent = cart.length;
  }
}

// ============================
// Fungsi Popup / Toast
function showPopup(msg){
  const popup = document.getElementById('popup');
  popup.innerHTML = msg;
  popup.classList.remove('hidden');
  popup.classList.add('show');
  setTimeout(()=>popup.classList.add('hidden'), 3000);
}

// ============================
// Toggle Mode Gelap/Terang
function toggleMode(){
  document.body.classList.toggle('dark-mode');
}

// ============================
// Daftar Produk
const produkList = [];
for (let i = 1; i <= 12; i++) {
  produkList.push({
    name: `Panel ${i}`,
    desc: `Servis digital ${i}`,
    price: i * 10,
    payLink: `https://wa.me/60123456789?text=Saya%20nak%20beli%20Panel%20${i}%20(RM${i*10})`,
    qr: `https://via.placeholder.com/150?text=QR+Panel+${i}`, // QR placeholder
    img: `https://via.placeholder.com/300x200?text=Produk+${i}`
  });
}

// ============================
// Render Produk & Select Option
document.addEventListener('DOMContentLoaded', () => {
  const produkDiv = document.getElementById('produk-list');
  const productSelect = document.getElementById('product');

  produkList.forEach(p => {
    // Card Produk
    const card = document.createElement('div');
    card.className = 'bg-[#fff1b8] border border-[#ffd700] rounded-2xl p-4 transition hover:scale-105 hover:shadow-xl';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover rounded-xl mb-4">
      <h4 class="text-xl font-semibold mb-2">${p.name}</h4>
      <p class="mb-2">${p.desc}</p>
      <p class="text-2xl font-bold mb-4">RM${p.price}</p>
      <div class="flex gap-2">
        <button class="w-full neon-button" onclick="addToCart('${p.name}', ${p.price})">Beli Sekarang</button>
        <button class="w-full neon-button bg-gray-300 text-black" onclick="showQR('${p.qr}')">QR</button>
      </div>
    `;
    produkDiv.appendChild(card);

    // Tambah ke select
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    productSelect.appendChild(opt);
  });
});

// ============================
// Fungsi Beli / Prompt WhatsApp
function beliProduk(name, price, link) {
  const whatsapp = prompt("Masukkan nombor WhatsApp anda:");
  if (!whatsapp) return;
  alert(`Order untuk ${name} RM${price} berjaya dicatat!\nSila bayar melalui: ${link}`);
  window.open(link, '_blank');
}

// ============================
// Tampilkan QR
function showQR(link){
  const popup = document.getElementById('popup');
  popup.innerHTML = `<img src="${link}" alt="QR Code" class="w-40 h-40 mx-auto rounded">`;
  popup.classList.remove('hidden');
  setTimeout(()=>popup.classList.add('hidden'), 5000);
}

// ============================
// Search / Filter Produk
const searchInput = document.createElement('input');
searchInput.id = "search";
searchInput.placeholder = "Cari produk...";
searchInput.className = "p-2 rounded border w-full mb-4";
document.getElementById('produk').prepend(searchInput);

searchInput.addEventListener('input', function(e){
  const term = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('#produk-list > div');
  cards.forEach(card => {
    const name = card.querySelector('h4').textContent.toLowerCase();
    card.style.display = name.includes(term) ? 'block' : 'none';
  });
});

// ============================
// Order Form Submit
document.getElementById('orderForm').addEventListener('submit', function(e){
  e.preventDefault();
  const nama = document.getElementById('name').value;
  const wa = document.getElementById('wa').value;
  const produk = document.getElementById('product').value;
  const note = document.getElementById('note').value;

  const orderData = {
    name: nama,
    product: produk,
    price: produkList.find(p=>p.name===produk)?.price || 0,
    whatsapp: wa,
    note: note,
    status: "Pending"
  };

  showReceipt(orderData);
});

// ============================
// Resit / Receipt
function showReceipt(data){
  alert(`
  RESIT PEMBELIAN
  Nama: ${data.name}
  Produk: ${data.product}
  Harga: RM${data.price}
  Status: ${data.status}
  `);
}

// ============================
// Login Admin
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('username').value;
  alert(`Login dicatat (testing)\nUsername: ${user}`);
});
