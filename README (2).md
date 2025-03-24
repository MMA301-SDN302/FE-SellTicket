# Frontend FastTicket - Ứng Dụng Di Động

Ứng dụng di động của hệ thống FastTicket, được phát triển bằng React Native và Expo, giúp người dùng dễ dàng tìm kiếm, đặt vé và quản lý vé sự kiện.

## Công Nghệ Sử Dụng

- **React Native**: Framework phát triển ứng dụng di động đa nền tảng
- **Expo**: Nền tảng phát triển và triển khai ứng dụng React Native
- **NativeWind**: Tailwind CSS cho React Native
- **React Navigation**: Điều hướng trong ứng dụng
- **Axios**: Gọi API từ backend
- **Context API**: Quản lý state toàn cục
- **Stripe React Native**: Tích hợp thanh toán
- **Socket.io Client**: Nhận thông báo thời gian thực
- **Async Storage**: Lưu trữ dữ liệu cục bộ

## Cài Đặt

1. Clone repository
```bash
git clone <repository-url>
cd FE-SellTicket-main
```

2. Cài đặt dependencies
```bash
npm install
```

3. Tạo file .env dựa trên mẫu .env.example và cấu hình các biến môi trường

4. Chạy ứng dụng
```bash
# Khởi động dự án Expo
npm start

# Chạy trên Android
npm run android

# Chạy trên iOS
npm run ios

# Chạy trên web
npm run web
```

## Cấu Trúc Thư Mục

```
FE-SellTicket-main/
├── assets/             # Hình ảnh, font chữ và tài nguyên tĩnh
├── components/         # Các component tái sử dụng
├── context/            # Context API cho quản lý state
├── hooks/              # Custom hooks
├── navigation/         # Cấu hình điều hướng
├── pages/              # Màn hình của ứng dụng
├── route/              # Định nghĩa các đường dẫn
├── types/              # Định nghĩa kiểu TypeScript
├── utils/              # Hàm tiện ích
├── data/               # Dữ liệu mẫu/mock data
├── App.tsx             # Component gốc của ứng dụng
├── global.css          # Style toàn cục
└── index.ts            # Điểm khởi đầu ứng dụng
```

## Tính Năng Chính

### Quản Lý Tài Khoản
- Đăng ký tài khoản mới
- Đăng nhập với email/số điện thoại
- Xác thực OTP
- Quên mật khẩu
- Chỉnh sửa thông tin cá nhân

### Khám Phá Sự Kiện
- Trang chủ hiển thị sự kiện nổi bật
- Tìm kiếm sự kiện theo tên, loại, địa điểm
- Lọc sự kiện theo danh mục, ngày, giá
- Xem chi tiết sự kiện với thông tin đầy đủ
- Xem vị trí sự kiện

### Đặt Vé
- Chọn loại vé và số lượng
- Điền thông tin người tham dự
- Xem tóm tắt đơn hàng
- Thanh toán qua Stripe
- Nhận xác nhận đặt vé

### Quản Lý Vé
- Xem danh sách vé đã đặt
- Xem chi tiết vé (bao gồm mã QR/Barcode)
- Hủy vé (nếu được phép)
- Chia sẻ vé với bạn bè

### Thông Báo
- Nhận thông báo về sự kiện mới
- Nhận nhắc nhở về sự kiện sắp diễn ra
- Cập nhật trạng thái vé

## Màn Hình Chính

1. **Màn hình đăng nhập/đăng ký**
   - Đăng nhập với email/số điện thoại
   - Đăng ký tài khoản mới
   - Quên mật khẩu

2. **Trang chủ**
   - Sự kiện nổi bật
   - Danh mục sự kiện
   - Sự kiện sắp diễn ra
   - Tìm kiếm nhanh

3. **Tìm kiếm**
   - Tìm kiếm nâng cao
   - Bộ lọc sự kiện
   - Kết quả tìm kiếm

4. **Chi tiết sự kiện**
   - Thông tin sự kiện
   - Loại vé và giá
   - Địa điểm và thời gian
   - Nút đặt vé

5. **Thanh toán**
   - Chọn phương thức thanh toán
   - Nhập thông tin thẻ
   - Xác nhận thanh toán

6. **Vé của tôi**
   - Danh sách vé đã đặt
   - Chi tiết vé với mã QR/Barcode
   - Tùy chọn hủy vé

7. **Tài khoản**
   - Thông tin cá nhân
   - Lịch sử đặt vé
   - Cài đặt thông báo
   - Đăng xuất

## Biến Môi Trường

```
# API
EXPO_PUBLIC_API_URL=https://api.fastticket.example.com

# Stripe
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

## Hỗ Trợ Đa Ngôn Ngữ

Ứng dụng hỗ trợ đa ngôn ngữ thông qua hệ thống context API, hiện tại đã hỗ trợ:
- Tiếng Việt
- Tiếng Anh 