# Hướng Dẫn Làm Dự Án Nhóm (Cho Người Mới) - BookNest FE

Tài liệu này dành cho bạn khi lần đầu làm dự án nhóm. Mục tiêu là giúp bạn:

- Biết bắt đầu từ đâu
- Biết cách làm việc cùng 2 thành viên khác mà ít conflict
- Biết lúc nào cần pull/rebase/merge
- Biết cách mở PR đúng chuẩn

---

## 1) Bạn đang có gì trong dự án này?

Hiện team đã có:

- Kế hoạch tổng theo WBS: `DOC/Plan/WBS_FE_Task_Assignment.md`
- Đặc tả theo từng người:
  - `DOC/Plan/Huy_Task_Spec.md`
  - `DOC/Plan/Han_Task_Spec.md`
  - `DOC/Plan/Oanh_Task_Spec.md`
- API contract: `DOC/API_ENDPOINTS.md`

Nguyên tắc quan trọng:

1. Làm đúng task đã chia
2. Không tự ý sửa file thuộc ownership của người khác nếu chưa sync
3. PR nhỏ, rõ mục tiêu, dễ review

---

## 2) Quy trình làm việc nhóm chuẩn (End-to-End)

### Bước 1: Đọc đúng tài liệu trước khi code

- Đọc file task của bạn trong `DOC/Plan/*_Task_Spec.md`
- Đọc endpoint liên quan trong `DOC/API_ENDPOINTS.md`
- Ghi ra 3 thứ trước khi code:
  - Màn hình/chức năng bạn sẽ làm
  - Endpoint bạn sẽ gọi
  - File bạn sẽ đụng vào

### Bước 2: Tạo branch riêng

Ví dụ:

- Huy: `feat/auth-guard-huy`
- Han: `feat/catalog-search-han`
- Oanh: `feat/user-admin-upload-oanh`

Mỗi người chỉ làm trên branch của mình, không code trực tiếp trên `main`.

### Bước 3: Chia task thành các lát nhỏ

Không làm 1 cục quá lớn. Tách thành các mini-task:

- Mini-task 1: dựng UI
- Mini-task 2: nối API
- Mini-task 3: loading/error/empty state
- Mini-task 4: test và polish

Mỗi mini-task xong thì commit 1 lần.

### Bước 4: Sync hằng ngày với team (10-15 phút)

Mỗi người trả lời 3 câu:

1. Hôm qua đã xong gì?
2. Hôm nay làm gì?
3. Đang bị block bởi ai/phần nào?

Mục tiêu là phát hiện va chạm sớm, không đợi đến lúc mở PR mới biết conflict.

### Bước 5: Pull/rebase thường xuyên

Trước khi bắt đầu code mỗi ngày:

1. Cập nhật branch mới nhất từ `main`
2. Rebase branch cá nhân lên bản mới

Trước khi mở PR:

1. Rebase lại 1 lần nữa
   Lệnh hay dùng:
   git checkout feature-branch
   git fetch origin
   git rebase origin/main
   Nếu có conflict thì Git sẽ dừng, bạn sửa conflict rồi:
   git add .
   git rebase --continue
   Muốn hủy rebase đang làm dở:
   git rebase --abort

2. Chạy test tay các luồng chính
3. Mới push và mở PR

### Bước 6: Mở PR đúng chuẩn

Một PR tốt cần có:

- Mục tiêu PR
- Phạm vi thay đổi
- API đã dùng
- Cách test
- Screenshot/video ngắn
- Rủi ro nếu có

---

## 3) Cách tránh conflict khi 3 người code cùng lúc

## 3.1 Xác định ownership file

Mỗi file nên có 1 owner chính.

- Nếu cần sửa file của người khác, nhắn trước trong nhóm.
- Tránh 2 người cùng sửa 1 block code cùng lúc.

## 3.2 Khóa các điểm giao nhau

Các điểm dễ va chạm nhất:

- Router
- Auth context
- Header/layout dùng chung
- API client/interceptor

Cách xử lý:

- Người phụ trách nền tảng merge trước
- Người còn lại rebase sau khi nền tảng ổn

## 3.3 Quy tắc “nhỏ và sớm”

- PR nhỏ dễ merge hơn PR lớn
- Merge sớm các phần nền (foundation)
- Không đợi làm xong hết mới mở PR

---

## 4) Checklist trước khi commit

- Đã đúng scope task của mình
- Không chạm file ngoài phạm vi nếu không cần
- Không để code thừa, import thừa
- Không làm vỡ UI responsive
- Có xử lý loading/error/empty state

---

## 5) Checklist trước khi mở PR

- Đã rebase branch mới nhất
- Đã test tay các case chính
- Không có lỗi nghiêm trọng trên local
- PR mô tả rõ theo template
- Có screenshot/video ngắn

---

## 6) Template mô tả PR (copy dùng ngay)

## Mục tiêu

- Hoàn thiện [tên chức năng]

## Phạm vi

- File thay đổi: [...]
- API sử dụng: [...]

## Đã làm

- [ ] UI
- [ ] API integration
- [ ] Loading/Error/Empty state
- [ ] Responsive

## Cách test

1. ...
2. ...
3. ...

## Kết quả

- Ảnh/video: ...

## Rủi ro

- ...

---

## 7) Khi bị conflict thì làm gì?

1. Bình tĩnh, không sửa vội
2. Xem file nào bị conflict
3. Nhắn đúng owner file để chốt logic đúng
4. Resolve từng phần nhỏ, không resolve hàng loạt
5. Chạy lại test tay các màn hình liên quan

Nếu conflict ở file nền tảng (router/auth/layout), luôn ưu tiên sync với người phụ trách luồng nền tảng trước.

---

## 8) Gợi ý lịch làm việc 1 sprint (5 ngày)

- Ngày 1: Chốt scope + tạo branch + dựng khung UI
- Ngày 2: Nối API chính + xử lý state
- Ngày 3: Hoàn thiện case lỗi + responsive + mở PR đợt 1
- Ngày 4: Review chéo + fix + mở PR đợt 2
- Ngày 5: Re-test end-to-end + chốt merge

---

## 9) Dấu hiệu bạn đang làm đúng

- Mỗi ngày đều có tiến độ rõ ràng
- PR nhỏ, review nhanh
- Ít conflict lớn vào cuối sprint
- Team luôn biết ai đang làm phần nào
- Khi có bug, truy ngược nhanh được từ PR và commit

---

## 10) Kết luận

Làm dự án nhóm không khó nếu giữ đúng 4 nguyên tắc:

1. Scope rõ
2. Ownership rõ
3. Sync đều
4. PR nhỏ, test kỹ

Bạn cứ bám đúng tài liệu trong `DOC/Plan` và checklist ở file này là sẽ làm rất ổn ngay từ sprint đầu tiên.
