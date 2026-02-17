import { db, ref, push, onValue, update } from './firebase.js';

let cart = [];

// ================= CART
window.addToCart = function(name, price){
  cart.push({name, price});
  updateCartUI();
  alert("Produk dimasukkan ke troli");
}

function updateCartUI(){
  document.getElementById("cart-count").textContent = cart.length;
}

// ================= ORDER SUBMIT
document.getElementById("orderForm").addEventListener("submit", e=>{
  e.preventDefault();

  const order = {
    name: document.getElementById("name").value,
    product: document.getElementById("product").value,
    whatsapp: document.getElementById("wa").value,
    status: "Pending",
    date: new Date().toLocaleString()
  };

  push(ref(db,"orders"), order);

  alert("Order berjaya dihantar!");
  e.target.reset();
});

// ================= ADMIN PANEL LOAD
const orderList = document.getElementById("order-list");

if(orderList){
  onValue(ref(db,"orders"), snapshot=>{
    orderList.innerHTML = "";
    snapshot.forEach(child=>{
      const data = child.val();
      const key = child.key;

      const div = document.createElement("div");
      div.innerHTML = `
        <p><b>${data.name}</b> - ${data.product}</p>
        <p>Status: ${data.status}</p>
        <button onclick="updateStatus('${key}','Diproses')">Proses</button>
        <button onclick="updateStatus('${key}','Selesai')">Selesai</button>
      `;
      orderList.appendChild(div);
    });
  });
}

window.updateStatus = function(id, status){
  update(ref(db,"orders/"+id),{status});
}
