const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'html')));

// Kết nối MySQL RDS
const db = mysql.createConnection({
    host: 'ems-database.c7k2kqcayjvv.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'longga1505',
    database: 'CongTy'
});

db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối database:', err);
        return;
    }
    console.log('Đã kết nối MySQL!');
});

// Cung cấp file index.html cho route "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route cho "/api/status"
app.get('/api/status', (req, res) => {
    res.json({ message: "API is running!" });
});

// Route cho "/api/instance-id"
app.get('/api/instance-id', (req, res) => {
    const instanceId = process.env.INSTANCE_ID || 'unknown';
    console.log('INSTANCE_ID from environment:', process.env.INSTANCE_ID);
    res.json({ instanceId: instanceId });
});

// Route cho "/api/nhanvien"
app.get('/api/nhanvien', (req, res) => {
    const sql = 'SELECT * FROM nhanvien';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi lấy nhanvien:', err);
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu nhân viên', details: err.message });
        }
        res.json(result);
    });
});

// Route để thêm nhân viên
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

// Route để cập nhật nhân viên
app.put('/api/nhanvien/:id', (req, res) => {
    const id = req.params.id;
    const { ten, namsinh, gioitinh, cccd, sdt, chucvu_id, phongban_id } = req.body;

    console.log('Dữ liệu cập nhật:', req.body);

    const sql = `
        UPDATE nhanvien 
        SET ten = ?, namsinh = ?, gioitinh = ?, cccd = ?, sdt = ?, chucvu_id = ?, phongban_id = ?
        WHERE id = ?
    `;

    db.query(sql, [ten, namsinh, gioitinh, cccd, sdt, chucvu_id, phongban_id, id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi SQL:', err.message);
            return res.status(500).json({ error: 'Lỗi khi cập nhật nhân viên', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
        }
        res.json({ message: 'Đã cập nhật nhân viên' });
    });
});

// Route để xóa nhân viên
app.delete('/api/nhanvien/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM nhanvien WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi SQL:', err.message);
            return res.status(500).json({ error: 'Lỗi khi xóa nhân viên', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
        }
        res.json({ message: 'Đã xóa nhân viên' });
    });
});

// Route cho "/api/phongban"
app.get('/api/phongban', (req, res) => {
    db.query('SELECT * FROM phongban', (err, result) => {
        if (err) {
            console.error('Lỗi lấy phongban:', err);
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu phòng ban', details: err.message });
        }
        res.json(result);
    });
});

// Route để thêm phòng ban
app.post('/api/phongban', (req, res) => {
    const { id, ten } = req.body;

    console.log('Dữ liệu nhận:', req.body);

    const sql = 'INSERT INTO phongban (id, ten) VALUES (?, ?)';
    db.query(sql, [id, ten], (err, result) => {
        if (err) {
            console.error('❌ Lỗi SQL:', err.message);
            return res.status(500).json({ error: 'Lỗi khi thêm phòng ban', details: err.message });
        }
        res.status(201).json({ message: 'Đã thêm phòng ban', id: id });
    });
});

// Route để xóa phòng ban
app.delete('/api/phongban/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM phongban WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi SQL:', err.message);
            return res.status(500).json({ error: 'Lỗi khi xóa phòng ban', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy phòng ban' });
        }
        res.json({ message: 'Đã xóa phòng ban' });
    });
});

// Route cho "/api/chucvu"
app.get('/api/chucvu', (req, res) => {
    db.query('SELECT * FROM chucvu', (err, result) => {
        if (err) {
            console.error('Lỗi lấy chucvu:', err);
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu chức vụ', details: err.message });
        }
        res.json(result);
    });
});

// Route để thêm chức vụ
app.post('/api/chucvu', (req, res) => {
    const { id, ten } = req.body;

    console.log('Dữ liệu nhận:', req.body);

    const sql = 'INSERT INTO chucvu (id, ten) VALUES (?, ?)';
    db.query(sql, [id, ten], (err, result) => {
        if (err) {
            console.error('❌ Lỗi SQL:', err.message);
            return res.status(500).json({ error: 'Lỗi khi thêm chức vụ', details: err.message });
        }
        res.status(201).json({ message: 'Đã thêm chức vụ', id: id });
    });
});

// Route để xóa chức vụ
app.delete('/api/chucvu/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM chucvu WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi SQL:', err.message);
            return res.status(500).json({ error: 'Lỗi khi xóa chức vụ', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy chức vụ' });
        }
        res.json({ message: 'Đã xóa chức vụ' });
    });
});

// Route cho "/api/login"
app.get('/api/login', (req, res) => {
    db.query('SELECT * FROM login', (err, result) => {
        if (err) {
            console.error('Lỗi lấy login:', err);
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu đăng nhập', details: err.message });
        }
        res.json(result);
    });
});

// Sửa để lắng nghe trên tất cả các địa chỉ IP
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
    console.log(`Instance ID: ${process.env.INSTANCE_ID || 'unknown'}`);
});