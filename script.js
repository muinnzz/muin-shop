// Produk + QR code
const produkList = [];
for(let i=1;i<=12;i++){
  produkList.push({
    name:`Panel ${i}`,
    desc:`Servis digital ${i}`,
    price:i*10,
    payLink:`https://wa.me/60123456789?text=Saya%20nak%20beli%20Panel%20${i}%20(RM${i*10})`,
    img:`https://via.placeholder.com/300x200?text=Produk+${i}`
  });
}

produkList.forEach(p=>{
  document.write(`
    <div class="card">
      <img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover rounded-xl mb-4">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <p>RM${p.price}</p>
      <button onclick="beliProduk('${p.name}',${p.price},'${p.payLink}')">Beli Sekarang</button>
      <div id="qr-${p.name}" class="hidden mt-2 text-center"></div>
    </div>
  `);
});

async function beliProduk(name, price, link){
  const whatsapp = prompt("Masukkan WhatsApp anda:");
  if(!whatsapp) return;
  const res = await fetch('/order',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,whatsapp,product:name,note:`Order RM${price}`,price})
  });
  const r = await res.json();
  if(r.success){
    alert('Order berjaya!');
    const qrDiv = document.getElementById(`qr-${name}`);
    qrDiv.innerHTML="<p>Scan untuk bayar</p>";
    qrDiv.classList.remove('hidden');
    new QRCode(qrDiv,{text:link,width:180,height:180});
  }else alert('Order gagal!');
}

// Order form
const orderForm=document.getElementById('orderForm');
if(orderForm){
  orderForm.addEventListener('submit', async e=>{
    e.preventDefault();
    const data={
      name:document.getElementById('name').value,
      whatsapp:document.getElementById('wa').value,
      product:document.getElementById('product').value,
      note:document.getElementById('note').value
    };
    const res=await fetch('/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const r=await res.json();
    if(r.success) alert('Order dihantar!');
    else alert('Order gagal!');
  });
}

// Login admin
const loginForm=document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', async e=>{
    e.preventDefault();
    const data={username:document.getElementById('username').value,password:document.getElementById('password').value};
    const res=await fetch('/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const r=await res.json();
    if(r.success) alert('Login berjaya!');
    else alert('Username/Password salah!');
  });
}