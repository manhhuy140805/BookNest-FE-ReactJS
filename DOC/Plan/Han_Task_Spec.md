# Đặc tả Task - Han (Luồng 2: Catalog + Search)

## 1) Thông tin chung

- Thành viên: Han
- Luồng phụ trách: Catalog + Search
- WBS chính: 3.0, 4.0, 6.0
- Story point đề xuất: 31
- Branch đề xuất: feat/catalog-search-han
- Ticket đề xuất: FE-STREAM-02

## 2) Mục tiêu công việc

- Hoàn thiện toàn bộ trải nghiệm duyệt sách, chi tiết sách, tìm kiếm và danh mục.
- Kết nối đầy đủ Search module: history, suggestions, trending.
- Xây nền cho admin book/category CRUD để Oanh có thể cắm quyền admin hoàn chỉnh.

## 3) Màn hình/chức năng phải hoàn thành

### 3.1 Catalog public

- Trang danh sách sách
- Trang chi tiết sách
- Trang tìm kiếm sách
- Trang danh sách danh mục
- Trang chi tiết danh mục

### 3.2 Search UX

- Search box global/header
- Search suggestions autocomplete
- Trending keywords
- Search history panel + clear/delete item

### 3.3 Admin catalog

- Quản lý sách: list/create/edit/delete
- Quản lý danh mục: list/create/edit/delete

## 4) API scope phụ trách

- GET /book
- GET /book/id/:id
- GET /book/search
- POST /book/create
- PUT /book/update/:id
- DELETE /book/delete/:id
- GET /category
- GET /category/:id
- POST /category
- PUT /category/:id
- DELETE /category/:id
- GET /search/history
- GET /search/suggestions
- GET /search/trending
- POST /search/clear-history
- DELETE /search/history/:id

## 5) Chi tiết task theo WBS

### 5.1 Books module

- Tạo list/detail/search page theo contract API.
- Chuẩn hóa filter, sort, pagination state.
- Tối ưu empty/loading/error cho list và detail.

### 5.2 Categories module

- Tạo danh sách và chi tiết category.
- Cắm bộ lọc category vào search/list sách.
- Tạo CRUD category cho quyền admin/moderator.

### 5.3 Search module

- Kết nối suggestions và trending vào giao diện tìm kiếm.
- Quản lý history: xem, xóa từng item, xóa toàn bộ.
- Debounce input + xử lý race condition khi search nhanh.

### 5.4 Admin catalog

- Form create/edit sách có validation chuẩn.
- Danh sách quản trị có action rõ ràng, confirm trước delete.

## 6) Tiêu chí nghiệm thu

- Các endpoint books/categories/search trong scope chạy đúng.
- Search hoạt động đúng với keyword/category/page/limit.
- Danh sách và chi tiết sách/category có loading/error/empty đầy đủ.
- CRUD sách/category hoạt động ổn định trên role hợp lệ.

## 7) Kiểm thử bắt buộc

- Test browse sách từ list -> detail -> quay lại list.
- Test search theo keyword/category và phân trang.
- Test suggestions/trending/history đầy đủ state.
- Test admin create/update/delete sách và category.
- Test responsive các page catalog/search (375/768/1024/1366).

## 8) Deliverables

- 1 PR chính cho public catalog + search.
- 1 PR phụ cho admin catalog CRUD.
- Bộ ảnh minh họa các trạng thái list/detail/search/admin.
- Checklist test cho full flow catalog.

## 9) Dependency

- Cần Huy hoàn tất auth + guard để khóa route admin đúng role.
- Cần Huy hoàn tất app foundation (layout shell + error pages + shared loading/empty).
- Cần Oanh cung cấp upload media component để dùng trong form sách (image/pdf).

## 10) Out of scope

- Không làm user management admin (create/update user).
- Không làm rating/favorite nghiệp vụ sâu (chỉ hiển thị nếu cần cho book detail).
