// Daftar Produk
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

// Render produk
const produkDiv = document.getElementById('produk-list');
const productSelect = document.getElementById('product');
produkList.forEach(p=>{
  // HTML produk
  const div = document.createElement('div');
  div.className = "bg-[#020617] border border-gray-800 rounded-2xl p-4 hover:border-indigo-500 transition";
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover rounded-xl mb-4">
    <h4 class="text-xl font-semibold mb-2">${p.name}</h4>
    <p class="text-gray-400 mb-2">${p.desc}</p>
    <p class="text-2xl font-bold text-indigo-400 mb-4">RM${p.price}</p>
    <button class="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-xl mb-2">
      Beli Sekarang
    </button>
  `;
  div.querySelector('button').onclick = ()=>{
    const whatsapp = prompt("Masukkan nombor WhatsApp anda:");
    if(!whatsapp) return;
    fetch('/order',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        name:p.name,
        whatsapp,
        product:p.name,
        note:`Order RM${p.price}`
      })
    }).then(res=>res.json()).then(result=>{
      if(result.success) alert("Order berjaya disimpan!");
      else alert("Order gagal!");
    });
    window.open(p.payLink, '_blank');
  }
  produkDiv.appendChild(div);

  // Isi select order form
  const opt = document.createElement('option');
  opt.value = p.name;
  opt.textContent = p.name;
  productSelect.appendChild(opt);
});

// Order form
document.getElementById('orderForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    whatsapp: document.getElementById('wa').value,
    product: document.getElementById('product').value,
    note: document.getElementById('note').value
  };
  const res = await fetch('/order',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  const result = await res.json();
  if(result.success) alert('Order dihantar!');
  else alert('Order gagal!');
});

// Login form
document.getElementById('loginForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const data = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  const res = await fetch('/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  const result = await res.json();
  if(result.success){
    alert('Login berjaya!');
    document.getElementById('admin-chart').classList.remove('hidden');

    // Render chart
    const stats = await fetch('/stats').then(r=>r.json());
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx,{
      type:'bar',
      data:{
        labels: stats.map(s=>s.product),
        datasets:[{
          label:'Jumlah Order',
          data: stats.map(s=>s.count),
          backgroundColor:'rgba(99,102,241,0.7)'
        }]
      },
      options:{
        responsive:true,
        plugins:{legend:{display:false}}
      }
    });
  } else alert('Username / Password salah!');
});
