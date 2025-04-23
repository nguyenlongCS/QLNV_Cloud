const express = require('express');
// const cors = require('cors');
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

// API chức vụ
app.get('/api/chucvu', (req, res) => {
    db.query('SELECT * FROM chucvu', (err, result) => {
        if (err) {
            console.error('Lỗi lấy chucvu:', err); // In chi tiết
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu chức vụ' });
        }
        res.json(result);
    });
});

// API chức vụ
app.get('/api/login', (req, res) => {
    db.query('SELECT * FROM login', (err, result) => {
        if (err) {
            console.error('Lỗi lấy chucvu:', err); // In chi tiết
            return res.status(500).json({ error: 'Lỗi khi lấy dữ liệu chức vụ' });
        }
        res.json(result);
    });
});


// // Make sure CORS is properly configured at the top of your server.js file
// app.use(cors({
//     origin: '*',  // Or specify your allowed origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Ensure body parser is properly configured
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route POST cho login
// app.post('/api/login', (req, res) => {
//     // Add debug logging
//     console.log('Login request received:', req.body);
    
//     const taikhoan = req.body.taikhoan?.trim();
//     const matkhau = req.body.matkhau?.trim();

//     if (!taikhoan || !matkhau) {
//         console.log('Missing username or password');
//         return res.status(400).json({ error: 'Thiếu tên đăng nhập hoặc mật khẩu' });
//     }

//     console.log('Processing login request for:', taikhoan);

//     // Modified SQL to not check vaitro initially, just fetch it
//     const sql = `
//         SELECT * FROM login 
//         WHERE taikhoan = ? 
//         AND matkhau = ?
//     `;

//     db.query(sql, [taikhoan, matkhau], (err, result) => {
//         if (err) {
//             console.error('SQL error during login:', err);
//             return res.status(500).json({ error: 'Lỗi khi đăng nhập' });
//         }

//         console.log('Query results:', result);

//         if (result.length === 0) {
//             return res.status(401).json({ error: 'Sai thông tin đăng nhập' });
//         }

//         // Return user data including vaitro
//         res.json({ 
//             message: 'Đăng nhập thành công!', 
//             user: {
//                 taikhoan: result[0].taikhoan,
//                 vaitro: result[0].vaitro
//             }
//         });
//     });
// });


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
