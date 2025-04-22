const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'html')));

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

// Cung cấp file index.html cho route "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Tạo route mới cho "/api/status"
app.get('/api/status', (req, res) => {
    res.json({ message: "API is running!" });  // Trả về JSON thông báo
});

// Route cho "/api/nhanvien"
app.get('/api/nhanvien', (req, res) => {
    const sql = 'SELECT * FROM nhanvien';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu nhân viên' });
        }
        res.json(result);
    });
});

// Route cho "/api/phongban"
app.get('/api/phongban', (req, res) => {
    const sql = 'SELECT * FROM phongban';  // Giả sử bạn có bảng `phongban`
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu phòng ban' });
        }
        res.json(result);
    });
});

// Route cho "/api/chucvu"
app.get('/api/chucvu', (req, res) => {
    const sql = 'SELECT * FROM chucvu';  // Giả sử bạn có bảng `chucvu`
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu chức vụ' });
        }
        res.json(result);
    });
});

// Route cho "/api/login"
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Giả sử bạn có bảng `users` lưu thông tin đăng nhập
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Lỗi khi đăng nhập' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });
        }

        res.json({ message: 'Đăng nhập thành công!' });
    });
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
