const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

const db = new sqlite3.Database('db.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    whatsapp TEXT,
    product TEXT,
    note TEXT,
    price INTEGER DEFAULT 10,
    paid INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);

  db.get(`SELECT * FROM users WHERE username='admin'`, (err,row)=>{
    if(!row){
      db.run(`INSERT INTO users (username,password) VALUES ('admin','123456')`);
    }
  });
});

app.post('/order', (req,res)=>{
  const {name, whatsapp, product, note, price} = req.body;
  db.run(`INSERT INTO orders (name, whatsapp, product, note, price) VALUES (?,?,?,?,?)`,
    [name, whatsapp, product, note, price||10], function(err){
      if(err) return res.json({success:false, error: err.message});
      res.json({success:true, id:this.lastID});
    });
});

app.get('/orders', (req,res)=>{
  db.all(`SELECT * FROM orders ORDER BY id DESC`, (err, rows)=>{
    if(err) return res.json([]);
    res.json(rows.map(r=>{ r.paid=r.paid===1; return r;}));
  });
});

app.post('/verify-payment', (req,res)=>{
  const {orderId} = req.body;
  db.run(`UPDATE orders SET paid=1 WHERE id=?`, [orderId], function(err){
    if(err) return res.json({success:false});
    res.json({success:true});
  });
});

app.get('/stats', (req,res)=>{
  db.all(`SELECT product, COUNT(*) as count FROM orders GROUP BY product`, (err,rows)=>{
    if(err) return res.json([]);
    res.json(rows);
  });
});

app.post('/login', (req,res)=>{
  const {username,password} = req.body;
  db.get(`SELECT * FROM users WHERE username=? AND password=?`, [username,password], (err,row)=>{
    if(err || !row) return res.json({success:false});
    res.json({success:true});
  });
});

app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));
