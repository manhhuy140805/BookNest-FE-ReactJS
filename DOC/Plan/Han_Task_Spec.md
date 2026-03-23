# Đặc tả Task - Han (Login + Header Search)

## 1) Thông tin chung

- Thành viên: Han
- WBS chính: 1.1.2 + 1.2.x
- Story point: 7
- Branch đề xuất: feat/header-search-login-han
- Ticket đề xuất: FE-WBS-02

## 2) Phạm vi file được sửa

- src/components/layout/Header.jsx
- src/pages/Auth/components/LoginForm.jsx
- (Nếu cần) src/pages/Auth/Login.jsx

## 3) Mục tiêu công việc

- Hoàn thiện UX phần Search trong Header (chỉ UI/interaction).
- Chuẩn hóa LoginForm: validation text, loading state, disabled state.
- Đảm bảo responsive và không vỡ bố cục trên mobile.

## 4) Chi tiết task theo WBS

### 4.1 Header - Search UX (WBS 1.1.2)

- Chuẩn hóa hành vi focus input (border/highlight rõ ràng).
- Hỗ trợ Enter để submit search UI event (tạm thời log/placeholder action).
- Thêm hành vi clear input để người dùng xóa nhanh.
- Chuẩn hóa icon Search click để trigger cùng hành vi với Enter.

Tiêu chí nghiệm thu:

- Focus state rõ ràng, không bị nhảy layout.
- Enter và icon click đều trigger 1 handler giống nhau.
- Có cách clear keyword trong <= 1 thao tác.
- Không break ở breakpoint <= 1024 (search ẩn/hiện đúng thiết kế).

### 4.2 LoginForm - validation và loading (WBS 1.2.1, 1.2.3)

- Chuẩn hóa message validation email/password để thống nhất.
- Khi đang submit: khóa nút login, tránh double submit.
- Khi đang google login: khóa action liên quan để tránh spam click.
- Kiểm tra alignment của remember me + forgot password.

Tiêu chí nghiệm thu:

- Validation message dễ hiểu, thống nhất giữa các field.
- Không gửi trùng request khi loading=true.
- UI loading không làm xô layout nút.

### 4.3 LoginForm - responsive và spacing (WBS 1.2.2)

- Căn lại khoảng cách header/subtitle/input/button cho mobile.
- Đảm bảo form không tràn màn hình ở chiều cao nhỏ.

Tiêu chí nghiệm thu:

- Ở 375px vẫn đọc dễ, không mất input/button.
- Ở >= 1024 layout cân đối với Banner.

## 5) Kiểm thử bắt buộc

- Test đăng nhập email/password thành công/thất bại (message hiện đúng).
- Test Google login button loading state.
- Test keyboard Enter trên input password.
- Test responsive: 375x812, 768x1024, 1366x768.

## 6) Deliverables

- 1 PR code cho LoginForm + Header search
- 3-5 screenshot (desktop/mobile/loading state)
- Video ngắn (10-20s) nếu có để minh họa Search UX

## 7) Out of scope

- Chưa kết nối API gợi ý search.
- Chưa xử lý search history/trending.

## 8) Dependency

- Rebase sau khi Header navigation của Huy đã merge.
