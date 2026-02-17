// =========================
// Keranjang & Cart
// =========================
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  showToast(`Produk "${name}" ditambah ke troli 🛒`);
}

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  if(cartCount){
    cartCount.textContent = cart.length;
  }
}

// =========================
// Mode Gelap / Terang
// =========================
function toggleMode(){
  document.body.classList.toggle('dark-mode');
  showToast(document.body.classList.contains('dark-mode') ? "Mode Gelap" : "Mode Terang");
}

// =========================
// Toast Notification
// =========================
function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.style.opacity = '1';
  setTimeout(()=>{
    toast.style.opacity = '0';
    toast.classList.add('hidden');
  },3000);
}

// =========================
// Daftar Produk
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const produkList = [];
  for (let i = 1; i <= 12; i++) {
    produkList.push({
      name: `Panel ${i}`,
      desc: `Servis digital ${i}`,
      price: i * 10,
      payLink: `https://wa.me/60166173129?text=Saya%20nak%20beli%20Panel%20${i}%20(RM${i*10})`,
      img: `https://via.placeholder.com/300x200?text=Produk+${i}`
    });
  }

  const produkDiv = document.getElementById('produk-list');
  const productSelect = document.getElementById('product');

  produkList.forEach(p => {
    // Card produk
    const card = document.createElement('div');
    card.className = 'bg-yellow-100 border border-yellow-400 rounded-xl p-4 hover:scale-105 transition shadow-md';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover rounded-xl mb-4">
      <h4 class="text-xl font-semibold mb-2">${p.name}</h4>
      <p class="text-gray-800 mb-2">${p.desc}</p>
      <p class="text-2xl font-bold text-yellow-600 mb-4">RM${p.price}</p>
      <div class="flex gap-2">
        <button class="w-1/2 neon-button" onclick="beliProduk('${p.name}', ${p.price}, '${p.payLink}')">Beli Sekarang</button>
        <button class="w-1/2 neon-button bg-orange-400 hover:bg-orange-500" onclick="addToCart('${p.name}', ${p.price})">Tambah ke Troli</button>
      </div>
    `;
    produkDiv.appendChild(card);

    // Tambah ke select form order
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    productSelect.appendChild(opt);
  });
});

// =========================
// Fungsi Beli Produk
// =========================
function beliProduk(name, price, link) {
  const whatsapp = prompt("Masukkan nombor WhatsApp anda:");
  if (!whatsapp) return;
  showReceipt({name, product: name, price});
  window.open(link, '_blank');
}

// =========================
// Resit / Receipt
// =========================
function showReceipt(data){
  alert(`
RESIT PEMBELIAN
Nama: ${data.name}
Produk: ${data.product}
Harga: RM${data.price}
Status: Pending
  `);
}

// =========================
// Form Order
// =========================
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = document.getElementById('name').value;
  const wa = document.getElementById('wa').value;
  const produk = document.getElementById('product').value;
  const note = document.getElementById('note').value;
  showToast(`Order diterima: ${produk} untuk ${nama}`);
  showReceipt({name: nama, product: produk, price: 'Tentukan harga'});
});

// =========================
// Form Login Admin
// =========================
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  showToast(`Login dicatat (testing)\nUsername: ${user}`);
});
