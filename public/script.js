// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// TROLI
let cart = [];

// PRODUK
const produkList=[];
for(let i=1;i<=12;i++){
  produkList.push({
    name:`Panel ${i}`,
    desc:`Servis digital ${i}`,
    price:i*10,
    qr:`https://via.placeholder.com/150?text=QR+Panel+${i}`,
    img:`https://via.placeholder.com/300x200?text=Produk+${i}`
  });
}

// RENDER PRODUK
document.addEventListener('DOMContentLoaded',()=>{
  const produkDiv=document.getElementById('produk-list');
  const productSelect=document.getElementById('product');

  produkList.forEach(p=>{
    const card=document.createElement('div');
    card.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <p>RM${p.price}</p>
      <div class="flex gap-2">
        <button onclick="addToCart('${p.name}',${p.price})">Beli Sekarang</button>
        <button onclick="showQR('${p.qr}')">QR</button>
      </div>
    `;
    produkDiv.appendChild(card);
    const opt=document.createElement('option');
    opt.value=p.name;
    opt.textContent=p.name;
    productSelect.appendChild(opt);
  });
});

// CART
function addToCart(name,price){
  cart.push({name,price});
  document.getElementById("cart-count").textContent=cart.length;
  showPopup(`Produk "${name}" ditambah ke troli`);
}

// SHOW QR
function showQR(link){
  const popup=document.getElementById('popup');
  popup.innerHTML=`<img src="${link}" style="width:120px;height:120px;">`;
  popup.style.display='block';
  setTimeout(()=>popup.style.display='none',3000);
}

// ORDER FORM
document.getElementById('orderForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const nama=document.getElementById('name').value;
  const wa=document.getElementById('wa').value;
  const produk=document.getElementById('product').value;
  const note=document.getElementById('note').value;
  const price=produkList.find(p=>p.name===produk)?.price||0;

  await db.collection('orders').add({
    name:nama,
    whatsapp:wa,
    product:produk,
    price:price,
    note:note,
    status:'Pending',
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
  });
  showPopup("Order berjaya dihantar!");
});

// ADMIN LOGIN
document.getElementById('adminForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const email=document.getElementById('adminUser').value;
  const pass=document.getElementById('adminPass').value;

  auth.signInWithEmailAndPassword(email,pass)
  .then(user=>{
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    loadOrders();
  })
  .catch(err=>showPopup("Login gagal!"));
});

// LOAD ORDERS FOR ADMIN
async function loadOrders(){
  const tbody=document.querySelector('#orderTable tbody');
  tbody.innerHTML='';
  const snapshot = await db.collection('orders').orderBy('timestamp','desc').get();
  snapshot.forEach(doc=>{
    const o=doc.data();
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td>${doc.id}</td>
      <td>${o.name}</td>
      <td>${o.product}</td>
      <td>${o.price}</td>
      <td>${o.whatsapp}</td>
      <td>${o.status}</td>
      <td><button onclick="updateStatus('${doc.id}')">Tandai Lunas</button></td>
    `;
    tbody.appendChild(tr);
  });
  renderChart(snapshot);
}

// UPDATE STATUS
async function updateStatus(id){
  await db.collection('orders').doc(id).update({status:'Lunas'});
  showPopup("Status order dikemaskini!");
  loadOrders();
}

// CHART
function renderChart(snapshot){
  const ctx=document.getElementById('salesChart').getContext('2d');
  const counts={};
  snapshot.forEach(doc=>counts[doc.data().product]=(counts[doc.data().product]||0)+1);
  new Chart(ctx,{
    type:'bar',
    data:{
      labels:Object.keys(counts),
      datasets:[{label:'Jumlah Order',data:Object.values(counts),backgroundColor:'#ffd700'}]
    }
  });
}

// MODE GELAP
function toggleMode(){ document.body.classList.toggle('dark-mode'); }

// POPUP
function showPopup(msg){
  const popup=document.getElementById('popup');
  popup.innerHTML=msg;
  popup.style.display='block';
  setTimeout(()=>popup.style.display='none',3000);
}
