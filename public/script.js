// Daftar produk
const produkList = [];
for (let i = 1; i <= 12; i++) {
  produkList.push({
    name: `Panel ${i}`,
    desc: `Servis digital ${i}`,
    price: i * 10,
    payLink: `https://wa.me/60123456789?text=Saya%20nak%20beli%20Panel%20${i}%20(RM${i*10})`,
    img: `https://via.placeholder.com/300x200?text=Produk+${i}`
  });
}

// Tambahkan produk ke #produk-list
const produkDiv = document.getElementById('produk-list');
produkList.forEach(p => {
  const card = document.createElement('div');
  card.className = 'bg-[#020617] border border-gray-800 rounded-2xl p-4 hover:border-indigo-500 transition fade-in';
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover rounded-xl mb-4">
    <h4 class="text-xl font-semibold mb-2">${p.name}</h4>
    <p class="text-gray-400 mb-2">${p.desc}</p>
    <p class="text-2xl font-bold text-indigo-400 mb-4">RM${p.price}</p>
    <button class="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-xl neon-button transition"
      onclick="beliProduk('${p.name}', ${p.price}, '${p.payLink}')">
      Beli Sekarang
    </button>
  `;
  produkDiv.appendChild(card);
});

// Tambahkan ke select #product
const productSelect = document.getElementById('product');
produkList.forEach(p => {
  const opt = document.createElement('option');
  opt.value = p.name;
  opt.textContent = p.name;
  productSelect.appendChild(opt);
});

// Fungsi beli
function beliProduk(name, price, link) {
  const whatsapp = prompt("Masukkan nombor WhatsApp anda:");
  if (!whatsapp) return;
  alert(`Order untuk ${name} RM${price} berjaya dicatat!\nSila bayar melalui: ${link}`);
  window.open(link, '_blank');
}

// Order form submit
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = document.getElementById('name').value;
  const wa = document.getElementById('wa').value;
  const produk = document.getElementById('product').value;
  const note = document.getElementById('note').value;
  alert(`Order diterima!\nNama: ${nama}\nWhatsApp: ${wa}\nProduk: ${produk}\nNota: ${note}`);
});

// Login form
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  alert(`Login dicatat (testing)\nUsername: ${user}`);
});
