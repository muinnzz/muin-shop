const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database
const db = new sqlite3.Database('db.sqlite');

db.serialize(() => {
  // Customers
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  // Orders
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    whatsapp TEXT,
    product TEXT,
    note TEXT,
    price INTEGER,
    status TEXT DEFAULT 'Pending',
    paid INTEGER DEFAULT 0,
    proof TEXT
  )`);

  // Users/Admin
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);

  // Admin default
  db.get(`SELECT * FROM users WHERE username='admin'`, (err,row)=>{
    if(!row){
      db.run(`INSERT INTO users (username,password) VALUES ('admin','123456')`);
      console.log('Admin user created: admin / 123456');
    }
  });
});

// ----- ROUTES -----
// Customer signup/login
app.post('/signup', (req,res)=>{
  const {name,email,password}=req.body;
  db.run(`INSERT INTO customers (name,email,password) VALUES (?,?,?)`,
    [name,email,password],
    err=>{
      if(err) return res.json({success:false});
      res.json({success:true});
    });
});

app.post('/customer-login',(req,res)=>{
  const {email,password}=req.body;
  db.get(`SELECT * FROM customers WHERE email=? AND password=?`,
    [email,password],
    (err,row)=>{
      if(!row) return res.json({success:false});
      res.json({success:true,user:row});
    });
});

// Update order status
app.post('/update-status',(req,res)=>{
  const {id,status} = req.body;
  db.run(`UPDATE orders SET status=? WHERE id=?`, [status,id], err=>{
    if(err) return res.json({success:false});
    res.json({success:true});
  });
});

// Upload proof
app.post('/upload-proof',(req,res)=>{
  const {orderId, proof}=req.body;
  db.run(`UPDATE orders SET proof=? WHERE id=?`, [proof,orderId], ()=>res.json({success:true}));
});

// Create order
app.post('/order', (req,res)=>{
  const {name, whatsapp, product, note, price} = req.body;
  db.run(`INSERT INTO orders (name, whatsapp, product, note, price) VALUES (?,?,?,?,?)`,
    [name, whatsapp, product, note, price||10],
    function(err){
      if(err) return res.json({success:false, error: err.message});
      res.json({success:true, id:this.lastID});
    });
});

// Get all orders
app.get('/orders', (req,res)=>{
  db.all(`SELECT * FROM orders ORDER BY id DESC`, (err, rows)=>{
    if(err) return res.json([]);
    res.json(rows.map(r=>{ r.paid=r.paid===1; return r; }));
  });
});

// Verify payment
app.post('/verify-payment', (req,res)=>{
  const {orderId} = req.body;
  db.run(`UPDATE orders SET paid=1 WHERE id=?`, [orderId], function(err){
    if(err) return res.json({success:false});
    res.json({success:true});
  });
});

// Stats
app.get('/stats', (req,res)=>{
  db.all(`SELECT product, COUNT(*) as count FROM orders GROUP BY product`, (err,rows)=>{
    if(err) return res.json([]);
    res.json(rows);
  });
});

// Admin login
app.post('/login', (req,res)=>{
  const {username,password} = req.body;
  db.get(`SELECT * FROM users WHERE username=? AND password=?`, [username,password], (err,row)=>{
    if(err || !row) return res.json({success:false});
    res.json({success:true});
  });
});

// Start server
app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));
