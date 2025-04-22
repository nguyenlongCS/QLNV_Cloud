const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối MySQL RDS
const db = mysql.createConnection({
  host: 'ems-database.c7k2kqcayjvv.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'longga1505',
  database: 'CongTy'
});

db.connect(err => {
  if (err) throw err;
  console.log('Đã kết nối MySQL!');
});

// API nhận dữ liệu từ HTML
app.post('/submit', (req, res) => {
  const { username } = req.body;
  const sql = 'INSERT INTO users (username) VALUES (?)';
  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi khi lưu dữ liệu');
    }
    res.send('Lưu thành công!');
  });
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
