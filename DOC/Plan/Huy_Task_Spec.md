# Đặc tả Task - Huy (Luồng 1: Auth + Guard + App Foundation)

## 1) Thông tin chung

- Thành viên: Huy
- Luồng phụ trách: Auth + Security Guard + Shared Foundation
- WBS chính: 1.0, 2.0, 10.0, 11.0 (phần nền tảng dùng chung)
- Story point đề xuất: 35
- Branch đề xuất: feat/auth-guard-huy
- Ticket đề xuất: FE-STREAM-01

## 2) Mục tiêu công việc

- Hoàn thiện toàn bộ luồng xác thực người dùng theo API.
- Thiết lập route guard và permission guard cho public/user/admin.
- Ổn định vòng đời token (login, refresh, logout, logout-all, session expiry).
- Xây nền tảng dùng chung cho toàn app: layout shell, chuẩn lỗi hệ thống, chuẩn loading/empty state.

## 3) Màn hình/chức năng phải hoàn thành

### 3.1 Authentication pages

- Login page
- Register page
- Verify email result page
- Forgot password page
- Reset password page
- Google callback page
- Change password page/modal

### 3.2 Guard & session

- Public route guard
- Authenticated route guard
- Role guard cho USER/MODERATOR/ADMIN
- Session expired handling + redirect

### 3.3 Shared foundation pages/components

- App shell layout (Header/Footer/Main + route wrapper)
- Trang lỗi hệ thống: 401/403/404/500
- Bộ component dùng chung cho loading skeleton và empty state

## 4) API scope phụ trách

- POST /auth/register
- POST /auth/login
- GET /auth/me
- POST /auth/change-password
- GET /auth/verify-email
- POST /auth/resend-verification
- POST /auth/forgot-password
- POST /auth/reset-password
- GET /auth/google
- GET /auth/google/callback
- POST /auth/google/token
- POST /auth/refresh
- POST /auth/logout
- POST /auth/logout-all

## 5) Chi tiết task theo WBS

### 5.1 Foundation cho Auth

- Chuẩn hóa auth context/store.
- Chuẩn hóa token storage strategy.
- Chuẩn hóa interceptor cho 401 + refresh token.

### 5.2 Luồng đăng nhập/đăng ký

- Hoàn thiện register/login form validation.
- Chuẩn hóa thông báo lỗi/success từ API.
- Điều hướng sau login/logout đúng role.

### 5.3 Luồng email/password nâng cao

- Verify email result + resend verification.
- Forgot/reset password theo token.
- Change password cho user đã đăng nhập.

### 5.4 OAuth Google

- Nút login Google, callback nhận token, đồng bộ session.
- Fallback error state khi callback thất bại.

### 5.5 Guard hệ thống

- Route-level guard cho trang private/admin.
- UI-level guard ẩn/disable action theo role.

### 5.6 Nền tảng dùng chung cho toàn app

- Chuẩn hóa app layout shell để các module cắm vào thống nhất.
- Tạo trang lỗi 401/403/404/500 và luồng điều hướng phù hợp.
- Tạo bộ EmptyState và LoadingSkeleton tái sử dụng.

## 6) Tiêu chí nghiệm thu

- Toàn bộ endpoint auth trong scope được gọi đúng contract.
- Không truy cập được trang private khi chưa login.
- Không truy cập được trang admin khi role không hợp lệ.
- Login/logout/logout-all hoạt động nhất quán trên toàn app.
- Có loading/error state cho tất cả form auth.
- Có trang lỗi hệ thống hoạt động đúng cho 401/403/404/500.
- Han và Oanh có thể tái sử dụng EmptyState/LoadingSkeleton không phải viết lại.

## 7) Kiểm thử bắt buộc

- Test login/register thành công và thất bại.
- Test verify email hợp lệ/hết hạn token.
- Test forgot/reset password end-to-end.
- Test Google callback có token và không có token.
- Test role guard USER/MODERATOR/ADMIN.
- Test chuyển hướng tới 401/403/404/500 theo đúng tình huống.
- Test component loading/empty dùng tốt trên ít nhất 3 màn hình khác nhau.

## 8) Deliverables

- 1 PR chính cho auth core + guard.
- 1 PR phụ cho app foundation (layout + error pages + shared loading/empty).
- Checklist test auth flow đầy đủ.
- Screenshot/video ngắn cho các luồng chính.

## 9) Dependency

- Cần Han cung cấp các page catalog để tích hợp EmptyState/LoadingSkeleton.
- Cần Oanh cung cấp các page admin/user để áp chuẩn lỗi và guard đồng nhất.

## 10) Out of scope

- Không làm business logic quản lý sách/category/user admin chi tiết.
- Không làm media upload manager UI.
