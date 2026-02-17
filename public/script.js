// ============================
// TROLI / CART
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  showPopup(`Produk "${name}" ditambah ke troli 🛒`);
}

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  if(cartCount){
    cartCount.textContent = cart.length;
  }
}

// ============================
// POPUP / TOAST
function showPopup(msg){
  const popup = document.getElementById('popup');
  popup.innerHTML = msg;
  popup.style.display = 'block';
  setTimeout(()=>popup.style.display='none', 3000);
}

// ============================
// TOGGLE MODE GELAP / TERANG
function toggleMode(){
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
// TAMPILKAN QR
function showQR(link){
  const popup = document.getElementById('popup');
  popup.innerHTML = `<img src="${link}" alt="QR Code" class="w-40 h-40 mx-auto rounded">`;
  popup.style.display = 'block';
  setTimeout(()=>popup.style.display='none', 5000);
}

// ============================
// ORDER FORM
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
// RESIT / RECEIPT
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
// LOGIN ADMIN (TESTING)
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('username').value;
  alert(`Login dicatat (testing)\nUsername: ${user}`);
});
