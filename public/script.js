let cart = [];

// Troli
function addToCart(name, price){
  cart.push({name,price});
  updateCartUI();
  showPopup(`Produk "${name}" ditambah ke troli 🛒`);
}

function updateCartUI(){
  const cartCount = document.getElementById('cart-count');
  if(cartCount) cartCount.textContent = cart.length;
}

// Toggle mode
function toggleMode(){
  document.body.classList.toggle('dark-mode');
}

// Popup
function showPopup(msg){
  const popup = document.getElementById('popup');
  popup.innerHTML = msg;
  popup.classList.remove('hidden');
  setTimeout(()=>popup.classList.add('hidden'), 3000);
}

// Produk
const produkList = [];
for(let i=1;i<=12;i++){
  produkList.push({
    name:`Panel ${i}`,
    desc:`Servis digital ${i}`,
    price:i*10,
    payLink:`https://wa.me/60123456789?text=Saya%20nak%20beli%20Panel%20${i}%20(RM${i*10})`,
    qr:`https://via.placeholder.com/150?text=QR+Panel+${i}`,
    img:`https://via.placeholder.com/300x200?text=Produk+${i}`
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  const produkDiv = document.getElementById('produk-list');
  const productSelect = document.getElementById('product');
  const searchInput = document.getElementById('searchInput');

  function renderProduk(filter=""){
    produkDiv.innerHTML="";
    produkList.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase())).forEach(p=>{
      const card = document.createElement('div');
      card.innerHTML=`
        <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover rounded-xl mb-4">
        <h4 class="text-xl font-semibold mb-2">${p.name}</h4>
        <p class="mb-2">${p.desc}</p>
        <p class="text-2xl font-bold mb-4">RM${p.price}</p>
        <div class="flex gap-2">
          <button class="w-full neon-button" onclick="addToCart('${p.name}',${p.price})">Beli Sekarang</button>
          <button class="w-full neon-button bg-gray-300 text-black" onclick="showQR('${p.qr}')">QR</button>
        </div>
      `;
      produkDiv.appendChild(card);
    });
  }

  renderProduk();
  searchInput.addEventListener('input', e=>renderProduk(e.target.value));

  // select options
  produkList.forEach(p=>{
    const opt = document.createElement('option');
    opt.value=p.name;
    opt.textContent=p.name;
    productSelect.appendChild(opt);
  });
});

// QR
function showQR(link){
  const popup = document.getElementById('popup');
  popup.innerHTML=`<img src="${link}" alt="QR" class="w-40 h-40 mx-auto rounded">`;
  popup.classList.remove('hidden');
  setTimeout(()=>popup.classList.add('hidden'),5000);
}

// Order Form
document.getElementById('orderForm').addEventListener('submit', e=>{
  e.preventDefault();
  const nama = document.getElementById('name').value;
  const wa = document.getElementById('wa').value;
  const produk = document.getElementById('product').value;
  const note = document.getElementById('note').value;
  const orderData = {
    name:nama,
    product:produk,
    price:produkList.find(p=>p.name===produk)?.price||0,
    whatsapp:wa,
    note:note,
    status:"Pending"
  };
  alert(`Order diterima!\nNama: ${nama}\nWhatsApp: ${wa}\nProduk: ${produk}\nHarga: RM${orderData.price}`);
});

// Login Admin (simulasi)
document.getElementById('loginForm').addEventListener('submit', e=>{
  e.preventDefault();
  const user = document.getElementById('username').value;
  alert(`Login dicatat (testing)\nUsername: ${user}`);
});
