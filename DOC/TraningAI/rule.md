# BỘ NGUYÊN TẮC CODE - BOOKNEST FE

Tài liệu này tổng hợp các nguyên tắc coding cần được tuân thủ xuyên suốt trong dự án BookNest FE.

## 1. Nguyên tắc chung

- Ưu tiên code dễ đọc, dễ bảo trì, dễ review.
- Mỗi thay đổi phải có mục tiêu rõ ràng, tránh sửa lan man ngoài scope.
- Không phá vỡ hành vi đang chạy ổn định nếu không có yêu cầu rõ.
- Ưu tiên chia nhỏ task theo WBS để dễ quản lý, dễ phân công và dễ kiểm thử.

## 2. Nguyên tắc giao tiếp và tài liệu

- Tất cả task spec, kế hoạch và mô tả công việc ưu tiên viết bằng tiếng Việt rõ ràng.
- Mô tả công việc phải có: scope, deliverables, tiêu chí nghiệm thu, out-of-scope, dependency.
- Mỗi task phải gắn với file/feature cụ thể, tránh mơ hồ.

## 3. Nguyên tắc cấu trúc code React

- Tách component theo tinh thần đơn trách nhiệm (single responsibility).
- Hạn chế trùng lặp JSX; ưu tiên map từ dữ liệu (array config) thay vì copy-paste.
- Tránh nhét quá nhiều logic vào 1 component lớn; nếu cần thì tách helper/hook.
- Đặt tên biến, hàm, component có ý nghĩa, thống nhất toàn dự án.

## 4. Nguyên tắc UI/UX

- UI phải responsive tối thiểu cho 3 mốc: mobile (375), tablet (768), desktop (>=1024).
- Không để vỡ bố cục khi thay đổi auth state (login/logout).
- Focus state, loading state, disabled state phải rõ ràng.
- Button/input/menu không được bị đè lên nhau hoặc không click được.
- Đồng bộ visual language giữa các form (Login/Register): spacing, radius, font weight, màu.

## 5. Nguyên tắc form và validation

- Validation message ngắn gọn, dễ hiểu, thống nhất tone.
- Không cho double submit khi đang loading.
- Các field liên quan phải ràng buộc hợp lý (ví dụ: confirmPassword phải khớp password).
- Tất cả thông báo lỗi API phải có fallback an toàn, tránh vỡ UI.

## 6. Nguyên tắc Header và điều hướng

- Navigation desktop/mobile phải dùng chung 1 nguồn dữ liệu item nếu có thể.
- Mobile drawer phải đóng đúng hành vi sau khi chọn item.
- Active state của menu phải phản ánh đúng route hiện tại.
- User menu phải xử lý tốt cả 2 trường hợp: có avatar và không có avatar.

## 7. Nguyên tắc sử dụng API

- Đi qua lớp service/config đã có, không gọi trực tiếp lung tung trong UI nếu không cần thiết.
- Xử lý lỗi nhất quán: ưu tiên message từ API, có fallback message mặc định.
- Không hard-code endpoint vào component; ưu tiên tập trung tại config/service.

## 8. Nguyên tắc clean code

- Chỉ comment khi cần thiết, ưu tiên để tên biến/hàm tự giải thích.
- Không để code chết, import thừa, style thừa sau khi hoàn tất.
- Hạn chế inline style quá dài nếu đã bắt đầu khó maintain.
- Tránh tạo side effect bất ngờ trong render.

## 9. Nguyên tắc branch, commit, PR

- Mỗi thành viên làm trên nhánh riêng, đặt tên branch theo convention của task.
- PR cần mô tả rõ: mục tiêu, phạm vi, ảnh hưởng, cách test, screenshot before/after.
- Nếu phần Header ảnh hưởng nhiều người, ưu tiên merge phần nền trước rồi rebase.
- Không gộp nhiều task không liên quan vào cùng 1 PR.

## 10. Nguyên tắc kiểm thử trước khi merge

- Test tay các route chính: /, /login, /register.
- Test responsive trên mobile/tablet/desktop.
- Test luồng auth state: chưa login, đã login có avatar, đã login không avatar.
- Đảm bảo không phát sinh warning/lỗi nghiêm trọng mới.

## 11. Định nghĩa hoàn thành (Definition of Done)

- Đúng scope đã thống nhất trong task spec.
- Đạt đầy đủ tiêu chí nghiệm thu của task.
- Không làm vỡ hành vi hiện có của màn hình liên quan.
- PR đã có tài liệu/chứng cứ test tối thiểu (screenshot hoặc video ngắn nếu cần).

## 12. Nguyên tắc phân chia task theo WBS

- Mỗi thành viên nhận 1 file nhỏ + 1 phần rõ ràng trong file lớn (nếu có).
- Khối lượng giữa các thành viên cần cân bằng tương đối (effort, độ khó, rủi ro).
- Mỗi task phải có thứ tự dependency để tránh conflict merge.

---

Cập nhật khi có quy ước mới: bổ sung vào tài liệu này để dùng làm chuẩn chung cho các sprint sau.
