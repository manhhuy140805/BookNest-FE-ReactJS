# Đặc tả Task - Huy (UI Navigation + Hero)

## 1) Thông tin chung

- Thành viên: Huy
- WBS chính: 1.1.1 + 1.4.x
- Story point: 7
- Branch đề xuất: feat/header-nav-hero-huy
- Ticket đề xuất: FE-WBS-01

## 2) Phạm vi file được sửa

- src/components/layout/Header.jsx
- src/pages/Home/components/HeroSection.jsx

## 3) Mục tiêu công việc

- Chuẩn hóa navigation desktop/mobile trong Header.
- Giảm trùng lặp JSX giữa menu desktop và menu mobile.
- Đồng bộ spacing/layout HeroSection để khớp với Header và viewport mobile.

## 4) Chi tiết task theo WBS

### 4.1 Header - Navigation/Desktop/Mobile (WBS 1.1.1)

- Tạo danh sách nav item dùng chung (array object) để render cho desktop và mobile.
- Đảm bảo click item trong Drawer mobile tự động đóng Drawer.
- Chuẩn hóa style active cho item đang được chọn (ưu tiên sử dụng pathname).
- Chuẩn hóa text nav hiện tại: Home, Shop, Pages, Blog, Contact.

Tiêu chí nghiệm thu:

- Menu desktop và mobile hiển thị cùng 1 bộ item.
- Không còn hard-code trùng lặp JSX nav item ở 2 nơi.
- Drawer mobile đóng sau khi chọn bất kỳ nav item nào.
- Active state hiển thị đúng với route hiện tại.

### 4.2 HeroSection - responsive/layout (WBS 1.4.1, 1.4.3)

- Điều chỉnh spacing top của Hero để không bị che bởi Header sticky.
- Chuẩn hóa breakpoint 1024/768/480 cho heading, button group, image.
- Đơn giản hóa inline style có thể tái sử dụng (tách constant style nhỏ nếu cần).
- Giữ animation hiện có, tránh tạo animation gây giật trên mobile.

Tiêu chí nghiệm thu:

- Hero không bị overlap Header ở desktop/mobile.
- Ở 375px, 768px, >= 1024px bố cục không vỡ.
- CTA button trong Hero vẫn click được, không bị element khác đè lên.

### 4.3 HeroSection - copy/CTA (WBS 1.4.2)

- Rà soát copy hiện tại cho ngắn gọn, dễ đọc.
- Đảm bảo 2 CTA rõ nghĩa, text ngắn và thống nhất tone.

Tiêu chí nghiệm thu:

- Không còn đoạn mô tả bị lặp/chưa thống nhất thương hiệu.
- CTA text thống nhất theo định hướng Home page.

## 5) Kiểm thử bắt buộc

- Test tay route: /, /login, /register
- Test responsive: 375x812, 768x1024, 1366x768
- Test Drawer:
  - Mở Drawer
  - Click từng nav item
  - Drawer đóng đúng hành vi

## 6) Deliverables

- 1 PR code cho Header + HeroSection
- 3-5 screenshot (desktop + mobile + drawer)
- Mô tả PR gồm: scope, before/after, risk và cách test

## 7) Out of scope

- Chưa kết nối API search/book category.
- Chưa làm page nội dung cho Shop/Pages/Blog/Contact.

## 8) Dependency

- Merge sớm để Han và Oanh rebase vào Header mới.
