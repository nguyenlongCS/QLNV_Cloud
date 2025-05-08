# ☁️ EMS - Employee Management System

**Web application quản lý nhân viên trên đám mây - dễ dùng, dễ mở rộng, triển khai siêu mượt với AWS!**

🔗 **Truy cập ngay:** [http://ems.io.vn](http://ems.io.vn)  
👉 *(Tên miền qua Cloudflare DNS, trỏ về AWS ALB: `xx-xx-xx.us-east-1.elb.amazonaws.com`)*

---

## 🚀 Tính năng chính

👤 **Nhân viên**
- Thêm mới
- Sửa thông tin
- Xoá
- Xem chi tiết

🏢 **Phòng ban & Chức vụ**
- Thêm
- Xoá

---

## 🛠️ Hạ tầng triển khai (AWS)

- **EC2 Instance (Ubuntu)**: Chạy Node.js backend + NGINX reverse proxy (public subnet)
- **RDS MySQL**: Lưu trữ dữ liệu nhân viên (private subnet)
- **ALB (Application Load Balancer)**: Điều phối traffic đến EC2
- **VPC + Subnets**: Tách biệt public/private network
- **IGW (Internet Gateway)**: Truy cập internet cho public subnet
- **Cloudflare DNS**: Trỏ domain `ems.io.vn` đến ALB

*(Bạn có thể xem sơ đồ kiến trúc bên dưới)*

![image](https://github.com/user-attachments/assets/a222ecde-f9d2-4395-b811-31355c332f23)


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
- [ ] Auto Scaling Group
- [ ] Xác thực người dùng (Auth)
- [ ] Phân quyền role
- [ ] Dashboard thống kê
- [ ] CI/CD pipeline auto-deploy

---

## ❤️ Đóng góp

Bạn thấy project này hay ho? Thì:
- ⭐ Star cho repo nha!
- Fork về build thêm tính năng siêu đỉnh ✨
- PR bất kỳ đóng góp nào bạn thấy hợp lý!

---

## 📫 Liên hệ


