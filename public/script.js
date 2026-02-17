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
    // Tambah ke katalog
    const card = document.createElement('div');
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover rounded-xl mb-4">
      <h4 class="text-xl font-semibold mb-2">${p.name}</h4>
      <p class="text-gray-200 mb-2">${p.desc}</p>
      <p class="text-2xl font-bold text-indigo-400 mb-4">RM${p.price}</p>
      <button class="w-full neon-button" onclick="beliProduk('${p.name}', ${p.price}, '${p.payLink}')">Beli Sekarang</button>
    `;
    produkDiv.appendChild(card);

    // Tambah ke select
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    productSelect.appendChild(opt);
  });
});

// Fungsi beli
function beliProduk(name, price, link) {
  const whatsapp = prompt("Masukkan nombor WhatsApp anda:");
  if (!whatsapp) return;
  alert(`Order untuk ${name} RM${price} berjaya dicatat!\nSila bayar melalui: ${link}`);
  window.open(link, '_blank');
}

// Order form
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
  alert(`Login dicatat (testing)\nUsername: ${user}`);
});
