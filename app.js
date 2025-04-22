const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 3000;

// Cấu hình cơ sở dữ liệu MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

// Cấu hình middleware để có thể truy cập các tài nguyên từ frontend (CORS)
const cors = require('cors');
app.use(cors());
app.use(express.json());

// API GET để truy xuất dữ liệu từ CSDL
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM your_table_name', (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi kết nối cơ sở dữ liệu' });
    }
    res.json(results);
  });
});

// API POST (nếu cần)
app.post('/data', (req, res) => {
  const data = req.body;
  connection.query('INSERT INTO your_table_name SET ?', data, (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi khi lưu dữ liệu' });
    }
    res.json({ success: true, id: results.insertId });
  });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
