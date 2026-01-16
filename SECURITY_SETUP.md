# 🔐 Hướng dẫn Cấu hình Bảo mật

## ⚠️ Các thông tin nhạy cảm đã được di chuyển vào file riêng

Dự án này sử dụng **Firebase** và **Cloudinary** để quản lý authentication và ảnh. Các thông tin nhạy cảm (API keys, credentials) **KHÔNG** nên để trong source code.

## 📁 Cấu trúc file bảo mật:

```
📦 project
├── config.js          ❌ KHÔNG COMMIT (chứa thông tin thực tế)
├── config.example.js  ✅ GỬI lên Git (template)
├── .gitignore         ✅ Ngăn config.js bị commit
├── login.html         ✅ Import từ config.js
└── images.html        ✅ Sử dụng config
```

## 🚀 Cách cấu hình lần đầu

### 1. Tạo file `config.js`
```bash
# Copy file template
cp config.example.js config.js
```

### 2. Lấy Firebase Config
1. Vào [Firebase Console](https://console.firebase.google.com)
2. Chọn project của bạn
3. Vào **Project Settings** → **General**
4. Cuộn xuống tìm **Your apps** → Chọn Web App
5. Copy phần "firebaseConfig" object
6. Dán vào file `config.js` thay thế `firebaseConfig`

### 3. Lấy Cloudinary Config
1. Vào [Cloudinary Console](https://cloudinary.com/console)
2. Copy **Cloud Name**
3. Vào **Settings** → **Upload** tab
4. Tìm **Upload presets** → Copy preset name
5. Dán vào file `config.js` thay thế `CLOUD_NAME` và `UPLOAD_PRESET`

### 4. Kiểm tra .gitignore
Đảm bảo `config.js` có trong `.gitignore`:
```gitignore
config.js
.env
.env.local
```

## ✅ Xác nhận cấu hình đúng

1. Mở `login.html` trong trình duyệt
2. Thử đăng nhập admin
3. Kiểm tra console (F12) không có lỗi import

## 📝 Lưu ý

- ❌ **KHÔNG COMMIT** `config.js` lên Git
- ✅ **CÓ THỂ COMMIT** `config.example.js` làm template
- 🔒 File `config.js` sẽ bị Git tự động bỏ qua (theo `.gitignore`)
- 💾 Mỗi lần git clone, cần copy `config.example.js` → `config.js` và thêm credentials

## 🔄 Khi thêm thành viên mới vào team

1. Gửi `config.example.js` cho họ
2. Họ sao chép thành `config.js` và thêm thông tin
3. Bảo mật đã được đảm bảo ✅

---
**Được tạo để bảo vệ thông tin nhạy cảm của dự án**
