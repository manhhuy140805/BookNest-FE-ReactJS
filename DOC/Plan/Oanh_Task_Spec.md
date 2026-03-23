# Đặc tả Task - Oanh (Register + User Menu)

## 1) Thông tin chung

- Thành viên: Oanh
- WBS chính: 1.1.3 + 1.3.x
- Story point: 8
- Branch đề xuất: feat/header-user-register-oanh
- Ticket đề xuất: FE-WBS-03

## 2) Phạm vi file được sửa

- src/components/layout/Header.jsx
- src/pages/Auth/components/RegisterForm.jsx
- (Nếu cần) src/pages/Auth/Register.jsx

## 3) Mục tiêu công việc

- Hoàn thiện user profile menu trong Header (login/logout state).
- Chuẩn hóa RegisterForm theo cùng visual language với LoginForm.
- Củng cố validation và UX submit cho flow đăng ký.

## 4) Chi tiết task theo WBS

### 4.1 Header - User menu/dropdown/drawer state (WBS 1.1.3)

- Chuẩn hóa avatar fallback khi user không có avatar.
- Chuẩn hóa user name truncation để không vỡ layout.
- Đảm bảo menu item profile/logout rõ ràng và đúng hành vi.
- Kiểm tra luồng mobile drawer với trạng thái đã đăng nhập/chưa đăng nhập.

Tiêu chí nghiệm thu:

- User có/không có avatar đều hiển thị tốt.
- Tên dài không vỡ layout, có ellipsis.
- Click logout clear state và quay về trang đúng hành vi hiện tại.
- Mobile drawer hiện đúng nhóm action theo auth state.

### 4.2 RegisterForm - validation rule (WBS 1.3.1)

- Chuẩn hóa rule fullName, email, password, confirmPassword.
- Bổ sung validation checkbox agree nếu được yêu cầu bắt buộc.
- Chuẩn hóa thông điệp lỗi cho đồng bộ tone.

Tiêu chí nghiệm thu:

- Confirm password luôn khớp password trước khi submit.
- Không submit được nếu field bắt buộc chưa hợp lệ.
- Message validation dễ hiểu, nhất quán.

### 4.3 RegisterForm - style và submit UX (WBS 1.3.2, 1.3.3)

- Đồng bộ style button/input với LoginForm (radius, spacing, weight).
- Kiểm tra submit loading để tránh double submit.
- Chỉnh căn subtitle/divider/social button để đều layout.

Tiêu chí nghiệm thu:

- Nhìn tổng thể RegisterForm đồng bộ với LoginForm.
- Nút submit loading ổn định, không xô giao diện.
- Ở mobile, layout register vẫn gọn và dễ thao tác.

## 5) Kiểm thử bắt buộc

- Test đăng ký với data hợp lệ/không hợp lệ.
- Test confirm password mismatch.
- Test open modal verify email (nếu có flow từ Register.jsx).
- Test Header khi:
  - Chưa login
  - Đã login có avatar
  - Đã login không avatar

## 6) Deliverables

- 1 PR code cho RegisterForm + Header user menu
- 3-5 screenshot (register states + user menu states)
- PR note mô tả rõ cảnh test auth state

## 7) Out of scope

- Chưa cần bổ sung page profile mới.
- Chưa cần đổi logic AuthContext.

## 8) Dependency

- Rebase sau khi Header navigation của Huy đã merge.
