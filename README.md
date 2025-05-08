# ☁️ EMS - Employee Management System

**Web application quản lý nhân viên trên đám mây - dễ dùng, dễ mở rộng, triển khai siêu mượt với AWS!**

🔗 **Truy cập ngay:** [http://ems.io.vn](http://ems.io.vn) *(đôi lúc không truy cập được do AWS lab Closed nhé 😅)*  
👉 *(Tên miền qua Cloudflare DNS, trỏ về AWS ALB: `xx-xx-xx.us-east-1.elb.amazonaws.com`)*

---

## 🚀 Tính năng chính

👤 **Nhân viên**
- Thêm mới.
- Sửa thông tin.
- Xoá.
- Xem chi tiết.

🏢 **Phòng ban & Chức vụ**
- Thêm.
- Xoá.

---

## 🎬 Demo web application

**Giao diện chính**  
![image](https://github.com/user-attachments/assets/d233d605-285e-4a47-a5c1-01d9395e5a78)

**Giao diện đăng nhập**  
![image](https://github.com/user-attachments/assets/3d8f21da-cea2-4fa7-b89a-e002e740c826)

---

## 🛠️ Hạ tầng triển khai (AWS)

- **EC2 Instance (Ubuntu)**: Chạy Node.js backend + NGINX reverse proxy (public subnet).
- **RDS MySQL**: Lưu trữ dữ liệu nhân viên (private subnet).
- **ALB (Application Load Balancer)**: Điều phối traffic đến EC2.
- **VPC + Subnets**: Tách biệt public/private network.
- **IGW (Internet Gateway)**: Truy cập internet cho public subnet.
- **Cloudflare DNS**: Trỏ domain `ems.io.vn` đến ALB.

*(Sơ đồ kiến trúc tham khảo bên dưới 👇)*

![image](https://github.com/user-attachments/assets/a222ecde-f9d2-4395-b811-31355c332f23)

---

## 🌐 Công nghệ sử dụng

| Layer         | Tech Stack               |
|---------------|--------------------------|
| Frontend      | HTML/CSS/JS (render từ Node.js) |
| Backend       | Node.js + Express        |
| Web Server    | NGINX reverse proxy      |
| Database      | MySQL (Amazon RDS)       |
| Hosting       | EC2 (Ubuntu)             |
| Networking    | AWS VPC + Subnets + ALB  |
| DNS/CDN       | Cloudflare               |

---

## 🚧 Đang phát triển

- [ ] Auto Scaling Group.
- [ ] Xác thực người dùng (Auth).
- [ ] Phân quyền role.
- [ ] Dashboard thống kê.
- [ ] CI/CD pipeline auto-deploy.

---

## ❤️ Đóng góp

Bạn thấy project này hay ho? Thì:
- ⭐ Star cho repo nha!
- Fork về build thêm tính năng siêu đỉnh ✨
- PR bất kỳ đóng góp nào bạn thấy hợp lý!

---

## 🧳 Portfolio cá nhân

👉 [Portfolio của Long Nguyễn](https://nguyenlongcs.github.io/portfolio.github.io/)

![Portfolio Screenshot](https://github.com/user-attachments/assets/9a8f56b2-598c-4a4e-97bb-91a56f0d88f3)

> Chào mừng bạn đến với portfolio cá nhân của tôi! Đây là nơi tôi chia sẻ các dự án, kỹ năng và hành trình phát triển của mình trong lĩnh vực công nghệ.

---

## 📫 Liên hệ

📧 Email: thanhlong86.tt@gmail.com  
💼 LinkedIn: [Nguyễn Long](https://www.linkedin.com/in/long-nguy%E1%BB%85n-263b4a269/)
🐙 GitHub: [nguyenlongcs](https://github.com/nguyenlongcs)
