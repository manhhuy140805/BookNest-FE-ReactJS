# Scope Và Ownership - Quy Ước Làm Việc Nhóm

Tài liệu này giúp team tránh chồng chéo khi code song song.

---

## 1) Scope rõ

## 1.1 Scope là gì?

Scope là phạm vi công việc bạn được làm trong sprint:

- Màn hình nào
- Chức năng nào
- API nào
- File nào

Nguyên tắc:

1. Chỉ làm trong scope đã chốt.
2. Việc ngoài scope phải tạo note và xin xác nhận trước.
3. Không "tiện tay" sửa thêm phần không liên quan.

## 1.2 Mẫu khai báo scope cho mỗi task

- Mục tiêu:
- Màn hình/chức năng:
- API sử dụng:
- File chính sẽ sửa:
- Out of scope:
- Tiêu chí nghiệm thu:

## 1.3 Quy tắc kiểm soát scope

1. Nếu phát sinh task mới: ghi vào backlog, không nhét vào PR hiện tại.
2. Nếu bug ngoài scope nhưng nghiêm trọng: fix tối thiểu, ghi rõ trong PR.
3. Nếu bug ngoài scope và không nghiêm trọng: tạo ticket riêng.

---

## 2) Ownership rõ

## 2.1 Ownership là gì?

Ownership là quyền chịu trách nhiệm chính cho một module/file.

- Owner quyết định kỹ thuật cuối cùng trong phần đó.
- Người khác muốn sửa phần owner phải báo trước.

## 2.2 Quy tắc ownership

1. Mỗi file quan trọng chỉ có 1 owner chính.
2. Contributor được phép sửa nhưng cần sync với owner.
3. Khi conflict, ưu tiên phương án của owner sau khi thống nhất.
4. Owner có trách nhiệm review nhanh phần mình phụ trách.

## 2.3 Bảng ownership theo phân công hiện tại

### Huy (Luồng Auth + Guard + Foundation)

- Module chính: Authentication, Route Guard, Shared Foundation.
- File/cụm ưu tiên ownership:
  - src/context/AuthContext.jsx
  - src/config/api.js
  - src/routes/AppRouter.jsx
  - Shared layout/error/loading/empty components

### Han (Luồng Catalog + Search)

- Module chính: Books, Categories, Search.
- File/cụm ưu tiên ownership:
  - Pages/Components liên quan book list/detail/search
  - Pages/Components liên quan category list/detail
  - Search UI và search state management

### Oanh (Luồng User + Admin + Upload)

- Module chính: Rating, Favorite, Admin User, Upload manager.
- File/cụm ưu tiên ownership:
  - Pages/Components liên quan rating/favorite
  - Pages/Components admin user CRUD
  - Upload image/pdf + media picker

---

## 3) Ma trận phối hợp khi đụng file của nhau

1. Sửa file có owner khác:

- Bước 1: Nhắn owner trước khi sửa.
- Bước 2: Mô tả lý do sửa + phần dự kiến sửa.
- Bước 3: Mở PR và tag owner review bắt buộc.

2. Sửa file lõi dùng chung (router/auth/layout):

- Luôn sync trong daily.
- Merge theo thứ tự: nền tảng trước, feature sau.

3. Khi conflict:

- Không tự resolve nếu không hiểu logic.
- Ping owner để chốt hướng xử lý.

---

## 4) Checklist nhanh trước khi mở PR

1. PR này có đúng scope đã chốt không?
2. Có sửa file thuộc ownership người khác không?
3. Nếu có, đã trao đổi và tag owner review chưa?
4. Có ghi rõ out-of-scope trong PR description chưa?
5. Có ảnh hưởng module khác không? Nếu có, đã ghi impact note chưa?

---

## 5) Cam kết làm việc nhóm

1. Scope rõ để không trượt việc.
2. Ownership rõ để không tranh chấp kỹ thuật.
3. PR nhỏ để review nhanh.
4. Sync hằng ngày để giảm conflict.

Nếu team giữ đúng 4 điểm này, tiến độ sẽ nhanh và ổn định hơn rất nhiều.
