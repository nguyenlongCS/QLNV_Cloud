const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
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
            console.error('Lỗi lấy nhanvien:', err);  // In chi tiết lỗi ra console
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu nhân viên', details: err });
        }
        res.json(result);  // Trả về kết quả
    });
});


// Route cho "/api/phongban"
app.get('/api/phongban', (req, res) => {
    db.query('SELECT * FROM phongban', (err, result) => {
        if (err) {
            console.error('Lỗi lấy phongban:', err); // In chi tiết
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu phòng ban' });
        }
        res.json(result);
    });
});

// Route cho "/api/chucvu"
app.get('/api/chucvu', (req, res) => {
    db.query('SELECT * FROM chucvu', (err, result) => {
        if (err) {
            console.error('Lỗi lấy chucvu:', err); // In chi tiết
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu chức vụ' });
        }
        res.json(result);
    });
});

// Route cho "/api/login"
app.get('/api/login', (req, res) => {
    db.query('SELECT * FROM login', (err, result) => {
        if (err) {
            console.error('Lỗi lấy chucvu:', err); // In chi tiết
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu chức vụ' });
        }
        res.json(result);
    });
});

app.post('/api/nhanvien', (req, res) => {
    const { ten, namsinh, gioitinh, cccd, sdt, chucvu_id, phongban_id } = req.body;

    console.log('Dữ liệu nhận:', req.body);

    const sql = `
        INSERT INTO nhanvien 
        (ten, namsinh, gioitinh, cccd, sdt, chucvu_id, phongban_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [ten, namsinh, gioitinh, cccd, sdt, chucvu_id, phongban_id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi SQL:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Đã thêm nhân viên', id: result.insertId });
    });
});




app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
