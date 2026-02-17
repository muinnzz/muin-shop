// Fade-in on scroll
const sections = document.querySelectorAll('section, .hero-section');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('fade-in');
    }
  });
},{threshold:0.2});
sections.forEach(s=>observer.observe(s));

// Toast helper
function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('opacity-0');
  toast.classList.add('fade-in');
  setTimeout(()=>{toast.classList.add('opacity-0');},2000);
}

// Loader
function showLoader(btn){
  btn.disabled = true;
  btn.textContent = 'Memproses...';
}
function hideLoader(btn,text){
  btn.disabled = false;
  btn.textContent = text;
}

// Produk
const produkList = [];
for(let i=1;i<=12;i++){
  produkList.push({
    name: `Panel ${i}`,
    desc: `Servis digital ${i}`,
    price: i*10,
    payLink: `https://wa.me/60123456789?text=Saya%20nak%20beli%20Panel%20${i}%20(RM${i*10})`,
    img: `https://via.placeholder.com/300x200?text=Produk+${i}`
  });
}

// Masukkan produk ke div #produk-list
const produkDiv = document.getElementById('produk-list');
produkList.forEach(p=>{
  const card = document.createElement('div');
  card.className = 'bg-[#020617] border border-gray-800 rounded-2xl p-4 hover:border-indigo-500 transition';
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

// Masukkan produk ke select #product
const productSelect = document.getElementById('product');
produkList.forEach(p=>{
  const opt = document.createElement('option');
  opt.value = p.name;
  opt.textContent = p.name;
  productSelect.appendChild(opt);
});const produkList = [];
for(let i=1;i<=12;i++){
  produkList.push({
    name: `Panel ${i}`,
    desc: `Servis digital ${i}`,
    price: i*10,
    payLink: `https://wa.me/60123456789?text=Saya%20nak%20beli%20Panel%20${i}%20(RM${i*10})`,
    img: `https://via.placeholder.com/300x200?text=Produk+${i}`
  });
}

// Masukkan produk ke div #produk-list
const produkDiv = document.getElementById('produk-list');
produkList.forEach(p=>{
  const card = document.createElement('div');
  card.className = 'bg-[#020617] border border-gray-800 rounded-2xl p-4 hover:border-indigo-500 transition';
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

// Masukkan produk ke select #product
const productSelect = document.getElementById('product');
produkList.forEach(p=>{
  const opt = document.createElement('option');
  opt.value = p.name;
  opt.textContent = p.name;
  productSelect.appendChild(opt);
}););

  // add to select
  const opt=document.createElement('option');
  opt.value=p.name;
  opt.textContent=p.name;
  productSelect.appendChild(opt);
});

// Order form
document.getElementById('orderForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const btn=e.target.querySelector('button');
  showLoader(btn);
  const data={
    name:document.getElementById('name').value,
    whatsapp:document.getElementById('wa').value,
    product:document.getElementById('product').value,
    note:document.getElementById('note').value
  };
  const res=await fetch('/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const result=await res.json();
  hideLoader(btn,'Hantar Order');
  if(result.success) showToast('Order dihantar!');
  else showToast('Order gagal!');
});

// Login admin + chart
document.getElementById('loginForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const btn=e.target.querySelector('button');
  showLoader(btn);
  const data={username:document.getElementById('username').value,password:document.getElementById('password').value};
  const res=await fetch('/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const result=await res.json();
  hideLoader(btn,'Login');
  if(result.success){
    showToast('Login berjaya!');
    const chartSec=document.getElementById('admin-chart');
    chartSec.classList.remove('hidden');
    observer.observe(chartSec);
    const stats=await fetch('/stats').then(r=>r.json());
    const ctx=document.getElementById('salesChart').getContext('2d');
    new Chart(ctx,{type:'bar',data:{labels:stats.map(s=>s.product),datasets:[{label:'Jumlah Order',data:stats.map(s=>s.count),backgroundColor:'rgba(99,102,241,0.7)'}]},options:{responsive:true,plugins:{legend:{display:false}},animation:{duration:1200}}});
  }else showToast('Username / Password salah!');
});
