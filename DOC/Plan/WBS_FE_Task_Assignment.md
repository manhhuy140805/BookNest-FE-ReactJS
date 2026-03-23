# WBS phân chia task FE cho 3 thành viên

## 1) Mục tiêu và nguyên tắc chia việc

- Mục tiêu: chia task theo WBS, có 1 file lớn + 3 file nhỏ, khối lượng giữa 3 thành viên tương đối cân bằng.
- File lớn dùng để chia theo module bên trong (không để 1 người ôm hết).
- Mỗi thành viên nhận 1 file nhỏ riêng + 1 phần trong file lớn.
- Ưu tiên tách rõ deliverable, tiêu chí nghiệm thu, dependency.

## 2) Các file trong phạm vi WBS

- File lớn: src/components/layout/Header.jsx
- File nhỏ 1: src/pages/Auth/components/LoginForm.jsx
- File nhỏ 2: src/pages/Auth/components/RegisterForm.jsx
- File nhỏ 3: src/pages/Home/components/HeroSection.jsx

## 3) WBS (Level 1 -> Level 3)

### 1.0 FE UI Refactor và hoàn thiện luồng cơ bản

### 1.1 Header module (file lớn: Header.jsx)

- 1.1.1 Tách phần navigation + route mapping
- 1.1.2 Hoàn thiện search UI action (chỉ UI/UX, chưa cần kết nối API search)
- 1.1.3 Hoàn thiện user menu và mobile drawer (trạng thái đăng nhập/chưa đăng nhập)

### 1.2 Auth login UI (file nhỏ: LoginForm.jsx)

- 1.2.1 Chuẩn hóa validation và message text
- 1.2.2 Tinh chỉnh responsive và khoảng cách
- 1.2.3 Chuẩn hóa trạng thái loading cho login/google

### 1.3 Auth register UI (file nhỏ: RegisterForm.jsx)

- 1.3.1 Chuẩn hóa validation (fullName, password, confirmPassword, agree)
- 1.3.2 Đồng bộ style với LoginForm
- 1.3.3 Tối ưu UX nút submit và trạng thái loading

### 1.4 Home hero UI (file nhỏ: HeroSection.jsx)

- 1.4.1 Tối ưu animation và responsive
- 1.4.2 Chuẩn hóa copy text và call-to-action
- 1.4.3 Tối ưu style inline để dễ maintain

### 1.5 Integration + QA

- 1.5.1 Kiểm thử route chính: /, /login, /register
- 1.5.2 Kiểm thử trạng thái user menu theo auth state
- 1.5.3 Smoke test trên mobile viewport

## 4) Phân công cho 3 thành viên (cân bằng effort)

### Thành viên A - Huy (UI Navigation lead)

- File nhỏ chính: src/pages/Home/components/HeroSection.jsx
- Phần file lớn: Header.jsx - phần navigation + menu desktop/mobile (WBS 1.1.1)
- Công việc cụ thể:
  - Chuẩn hóa nav items, active style, và hành vi đóng drawer khi click link.
  - Giảm trùng lặp JSX desktop/mobile nếu có thể.
  - Chỉnh HeroSection để đồng bộ spacing với Header.
- Ước lượng: 7 points
- File đặc tả chi tiết: Plan/Huy_Task_Spec.md

### Thành viên B - Han (Auth login lead)

- File nhỏ chính: src/pages/Auth/components/LoginForm.jsx
- Phần file lớn: Header.jsx - phần search box và icon action (WBS 1.1.2)
- Công việc cụ thể:
  - Chuẩn hóa validation text, states loading, disabled.
  - Hoàn thiện UI search input (focus, clear, icon click).
  - Đảm bảo responsive: ẩn/hiện đúng breakpoints.
- Ước lượng: 7 points
- File đặc tả chi tiết: Plan/Han_Task_Spec.md

### Thành viên C - Oanh (Auth register lead)

- File nhỏ chính: src/pages/Auth/components/RegisterForm.jsx
- Phần file lớn: Header.jsx - phần user profile dropdown + logout flow UI (WBS 1.1.3)
- Công việc cụ thể:
  - Chuẩn hóa rules RegisterForm và thông điệp lỗi.
  - Đồng bộ màu/nút với LoginForm.
  - Xử lý user avatar fallback, user name truncation, menu action rõ ràng.
- Ước lượng: 8 points
- File đặc tả chi tiết: Plan/Oanh_Task_Spec.md

## 5) Definition of Done cho mỗi task

- Code pass eslint (không tạo warning mới nghiêm trọng).
- Không làm vỡ route hiện tại trong AppRouter.
- Test tay desktop + mobile (375px, 768px, >= 1024px).
- UI không vỡ bố cục khi login/logout.
- PR có screenshot trước/sau cho màn hình chính liên quan.

## 6) Dependency và thứ tự triển khai

1. A/B/C cùng khởi động trên nhánh riêng.
2. A merge phần nav trước (có ảnh hưởng layout tổng).
3. B và C rebase sau khi Header nav merge.
4. Merge Hero/Login/Register.
5. Chạy QA tổng (WBS 1.5) trước khi chốt sprint.

## 7) Kế hoạch 5 ngày gợi ý

- Day 1: Chốt scope, chia branch, setup coding convention.
- Day 2-3: Làm task theo phân công chính.
- Day 4: Review chéo giữa 3 thành viên + fix.
- Day 5: Integration QA, polish UI, chốt PR.

## 8) Mẫu branch và ticket để bạn quản lý dễ hơn

- Branch:
  - feat/header-nav-hero-a
  - feat/header-search-login-b
  - feat/header-user-register-c
- Ticket IDs:
  - FE-WBS-01 (A)
  - FE-WBS-02 (B)
  - FE-WBS-03 (C)

## 9) Danh sách file task theo thành viên

- Plan/Huy_Task_Spec.md
- Plan/Han_Task_Spec.md
- Plan/Oanh_Task_Spec.md
