# Đặc tả Task - Oanh (Luồng 3: User + Admin + Upload)

## 1) Thông tin chung

- Thành viên: Oanh
- Luồng phụ trách: User Features + Admin User + Upload/Media
- WBS chính: 5.0, 7.0, 8.0, 9.0, 11.0 (phần tích hợp UX lỗi/feedback cho user-admin)
- Story point đề xuất: 32
- Branch đề xuất: feat/user-admin-upload-oanh
- Ticket đề xuất: FE-STREAM-03

## 2) Mục tiêu công việc

- Hoàn thiện toàn bộ tính năng người dùng: rating, favorite, profile state.
- Xây đầy đủ khu vực quản trị user.
- Hoàn thiện upload manager cho image/pdf (Cloudinary/Supabase) để tái sử dụng.

## 3) Màn hình/chức năng phải hoàn thành

### 3.1 User features

- Trang danh sách yêu thích
- Widget thao tác thêm/xóa yêu thích tại card và chi tiết sách
- Khu vực quản lý đánh giá của tôi
- UI profile state (avatar fallback, user menu state)

### 3.2 Admin user management

- Trang danh sách người dùng
- Trang chi tiết user
- Form tạo user
- Form cập nhật user
- Action xóa user
- Search user theo keyword/role
- Action cleanup unverified users

### 3.3 Upload/media manager

- Upload/Delete image
- Upload/Delete PDF (Cloudinary)
- Upload/Delete PDF (Supabase)
- Media picker dùng lại cho form admin books

## 4) API scope phụ trách

- GET /rating
- GET /rating/:id
- GET /rating/book/:bookId
- GET /rating/user/:userId
- POST /rating
- PUT /rating/:id
- DELETE /rating/:id
- GET /user/favoriteBoks
- POST /user/favorite/add/:bookId
- DELETE /user/favorite/remove/:bookId
- GET /user
- GET /user/id/:id
- POST /user/create
- PUT /user/update/:id
- DELETE /user/remove/:id
- GET /user/search
- POST /auth/cleanup-unverified
- POST /cloudinary/image
- DELETE /cloudinary/image
- POST /cloudinary/pdf
- DELETE /cloudinary/pdf
- POST /supabase/pdf
- DELETE /supabase/pdf

## 5) Chi tiết task theo WBS

### 5.1 Ratings module

- Hiển thị danh sách rating theo book/user.
- Tạo/sửa/xóa rating với UX rõ ràng.
- Đồng bộ rating summary trong book detail (nếu có hook sẵn).

### 5.2 Favorite module

- Cắm CTA add/remove favorite tại list/detail sách.
- Trang favorite list có empty/loading/error state.

### 5.3 Admin user module

- Xây bảng user management có phân trang/search/filter role.
- Form create/update user có validation cơ bản.
- Action delete + cleanup unverified có confirm modal.

### 5.4 Media upload module

- Upload manager thống nhất cho image/pdf.
- Hỗ trợ preview file + xử lý lỗi upload.
- Trả về URL/path chuẩn để Han tích hợp vào form sách.

### 5.5 Observability/feedback cho user-admin

- Chuẩn hóa toast và inline error cho toàn bộ màn hình trong scope Oanh.
- Chuẩn hóa empty state theo bộ component dùng chung.
- Bổ sung fallback khi API timeout/4xx/5xx cho rating/favorite/user/upload.

## 6) Tiêu chí nghiệm thu

- Endpoint ratings/favorite/users/upload chạy đúng contract.
- User có thể thêm/xóa favorite và quản lý rating end-to-end.
- Admin có thể list/search/create/update/delete user.
- Upload manager trả về dữ liệu dùng được cho form sách.
- Các page trong scope dùng đúng bộ EmptyState/LoadingSkeleton do Huy cung cấp.
- Toast/inline error hiển thị nhất quán ở tất cả flow trong scope Oanh.

## 7) Kiểm thử bắt buộc

- Test tạo/sửa/xóa rating trên 1 sách cụ thể.
- Test add/remove favorite từ list và detail sách.
- Test admin CRUD user + search theo role.
- Test upload/delete image/pdf cho cả Cloudinary và Supabase.
- Test fallback khi upload lỗi định dạng/kích thước.

## 8) Deliverables

- 1 PR chính cho user features (rating/favorite).
- 1 PR chính cho admin user + upload manager.
- Bộ ảnh/video ngắn minh họa các flow nghiệp vụ.
- Checklist test admin + upload.

## 9) Dependency

- Cần Huy hoàn tất auth + role guard để mở đúng quyền admin/moderator.
- Cần Huy hoàn tất app foundation (error pages + shared loading/empty).
- Cần Han hoàn tất form sách để tích hợp media picker.

## 10) Out of scope

- Không phụ trách login/register/forgot/reset flow.
- Không phụ trách catalog search logic cốt lõi.
