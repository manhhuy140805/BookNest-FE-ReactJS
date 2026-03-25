# WBS FE TOAN BO PROJECT BOOKNEST (DUA TREN API)

## 1) Muc tieu

- Lap danh sach day du giao dien va chuc nang FE can lam cho toan bo project.
- Bám theo API hien co trong DOC/API_ENDPOINTS.md de tranh thieu scope.
- Lam co so de tach backlog, phan sprint, va phan cong thanh vien.

## 2) Pham vi tong quan theo module

- Authentication: dang ky, dang nhap, google login, xac thuc email, quen/reset mat khau, logout.
- Books: danh sach sach, chi tiet sach, tim kiem sach, CRUD sach (admin).
- Categories: danh sach, chi tiet, CRUD danh muc (admin/moderator).
- Ratings: danh sach, tao/sua/xoa danh gia, loc theo sach/nguoi dung.
- Search: lich su tim kiem, goi y tim kiem, trending, xoa lich su.
- Upload: upload/delete image va PDF (Cloudinary/Supabase).
- Users: profile co ban, quan ly user (admin), yeu thich sach.

## 3) Danh sach giao dien can co (UI Inventory)

### 3.1 Public pages

- Trang chu
- Trang login
- Trang register
- Trang verify email result
- Trang forgot password
- Trang reset password
- Trang callback Google auth
- Trang danh sach sach
- Trang chi tiet sach
- Trang tim kiem sach
- Trang danh sach category
- Trang chi tiet category

### 3.2 Authenticated user pages

- Trang profile user
- Trang doi mat khau
- Trang danh sach yeu thich
- Trang lich su tim kiem
- Trang quan ly danh gia cua toi

### 3.3 Admin/Moderator pages

- Trang dashboard quan tri (tong quan)
- Trang quan ly sach (list/create/edit/delete)
- Trang quan ly category (list/create/edit/delete)
- Trang quan ly user (list/detail/create/edit/delete/search)
- Trang cleanup unverified users
- Trang upload media manager (image/pdf)

## 4) WBS chi tiet theo module

### 1.0 Foundation & App Architecture

- 1.1 App routing (public/private/admin route guard)
- 1.2 Auth context + token lifecycle (access/refresh)
- 1.3 Shared layout (Header/Footer/Main container)
- 1.4 Shared UI components (Button, Input, Modal, Table, Empty, Pagination)
- 1.5 API client setup (interceptor, error normalize, toast messaging)

### 2.0 Authentication Module

- 2.1 Register UI + validate form
- 2.2 Login UI + remember me + error handling
- 2.3 Google login flow (/auth/google, /auth/callback)
- 2.4 Verify email page (/auth/verify-email)
- 2.5 Resend verification UI
- 2.6 Forgot password UI
- 2.7 Reset password UI
- 2.8 Me endpoint bootstrap user session (/auth/me)
- 2.9 Logout + logout all devices

### 3.0 Books Module

- 3.1 Book list page (GET /book)
- 3.2 Book detail page (GET /book/id/:id)
- 3.3 Book search page (GET /book/search)
- 3.4 Book filter + pagination + sort (FE state)
- 3.5 Admin create book (POST /book/create)
- 3.6 Admin update book (PUT /book/update/:id)
- 3.7 Admin delete book (DELETE /book/delete/:id)

### 4.0 Categories Module

- 4.1 Category list page (GET /category)
- 4.2 Category detail page (GET /category/:id)
- 4.3 Category create (POST /category)
- 4.4 Category update (PUT /category/:id)
- 4.5 Category delete (DELETE /category/:id)

### 5.0 Ratings Module

- 5.1 Ratings list (GET /rating)
- 5.2 Rating detail (GET /rating/:id)
- 5.3 Ratings by book (GET /rating/book/:bookId)
- 5.4 Ratings by user (GET /rating/user/:userId)
- 5.5 Create rating (POST /rating)
- 5.6 Update rating (PUT /rating/:id)
- 5.7 Delete rating (DELETE /rating/:id)

### 6.0 Search Module

- 6.1 Search history UI (GET /search/history)
- 6.2 Search suggestions autocomplete (GET /search/suggestions)
- 6.3 Trending keywords section (GET /search/trending)
- 6.4 Clear all history (POST /search/clear-history)
- 6.5 Delete one history item (DELETE /search/history/:id)

### 7.0 Favorites & User Module

- 7.1 Favorite list page (GET /user/favoriteBoks)
- 7.2 Add favorite action (POST /user/favorite/add/:bookId)
- 7.3 Remove favorite action (DELETE /user/favorite/remove/:bookId)
- 7.4 User profile detail for admin (GET /user/id/:id)
- 7.5 User search for admin (GET /user/search)

### 8.0 Admin User Management Module

- 8.1 User list page (GET /user)
- 8.2 Create user (POST /user/create)
- 8.3 Update user (PUT /user/update/:id)
- 8.4 Delete user (DELETE /user/remove/:id)
- 8.5 Cleanup unverified users (POST /auth/cleanup-unverified)

### 9.0 Media Upload Module

- 9.1 Upload image UI (POST /cloudinary/image)
- 9.2 Delete image action (DELETE /cloudinary/image)
- 9.3 Upload PDF via cloudinary (POST /cloudinary/pdf)
- 9.4 Delete PDF via cloudinary (DELETE /cloudinary/pdf)
- 9.5 Upload PDF via supabase (POST /supabase/pdf)
- 9.6 Delete PDF via supabase (DELETE /supabase/pdf)
- 9.7 Media picker component cho admin form

### 10.0 Security, Role & Guard

- 10.1 UI guard cho role USER/MODERATOR/ADMIN
- 10.2 Route-level permission guard
- 10.3 Button-level permission hide/disable
- 10.4 Session expiry handling + redirect

### 11.0 Observability & Error UX

- 11.1 Trang 401/403/404/500
- 11.2 Toast + inline error standard
- 11.3 Loading skeleton/shimmer cho page chinh
- 11.4 Empty state cho list, search, favorite, rating

### 12.0 QA & Release Readiness

- 12.1 Smoke test full flow auth
- 12.2 Smoke test full flow book browsing + rating + favorite
- 12.3 Smoke test admin CRUD (book/category/user)
- 12.4 Responsive test 375/768/1024/1366
- 12.5 Regression checklist truoc release

## 5) Mapping API -> Giao dien/Chuc nang FE

### 5.1 Auth API mapping

- /auth/register -> Register page + validation + success state
- /auth/login -> Login page + token store + redirect
- /auth/me -> Init auth state khi load app
- /auth/change-password -> Change password modal/page
- /auth/verify-email -> Verify email result page
- /auth/resend-verification -> Resend verification action
- /auth/forgot-password -> Forgot password page
- /auth/reset-password -> Reset password page
- /auth/google + /auth/google/callback + /auth/google/token -> Google OAuth flow
- /auth/refresh -> token refresh background
- /auth/logout + /auth/logout-all -> logout actions

### 5.2 Book API mapping

- /book -> Book list page
- /book/id/:id -> Book detail page
- /book/search -> Search result page
- /book/create|update|delete -> Admin book management pages

### 5.3 Category API mapping

- /category + /category/:id -> Category list/detail pages
- POST/PUT/DELETE /category -> Admin/Moderator category management

### 5.4 Rating API mapping

- /rating, /rating/:id, /rating/book/:bookId, /rating/user/:userId -> Rating list/detail widgets
- POST/PUT/DELETE /rating -> Rating CRUD actions

### 5.5 Search API mapping

- /search/history -> Search history panel
- /search/suggestions -> Autocomplete dropdown
- /search/trending -> Trending widget
- /search/clear-history, /search/history/:id -> History management actions

### 5.6 User/Favorite API mapping

- /user/favoriteBoks -> Favorite page
- /user/favorite/add/:bookId + /remove/:bookId -> Favorite CTA in book cards/detail
- /user + /user/id/:id + /user/create + /user/update/:id + /user/remove/:id + /user/search -> Admin user pages

### 5.7 Upload API mapping

- /cloudinary/image, /cloudinary/pdf, /supabase/pdf + delete endpoints -> Upload manager va file selector

## 6) Backlog uu tien (de lam sprint)

- P0 (bat buoc): Foundation, Auth core, Book list/detail/search, Category list, Rating create/view, Favorite, Route guard.
- P1 (quan trong): Forgot/reset/verify flow day du, Search module day du, Admin book/category CRUD.
- P2 (mo rong): Admin user CRUD/search, media manager hoan chinh, trending/search analytics UX.

## 7) Definition of Done cho moi task

- Dung endpoint va contract API da mo ta trong DOC/API_ENDPOINTS.md.
- Co loading/error/empty state cho man hinh chinh.
- Co role guard neu chuc nang yeu cau phan quyen.
- Test tay desktop + mobile, khong vo bo cuc.
- PR co checklist test va screenshot before/after.

## 8) Ke hoach phan cong 3 thanh vien (chot)

- Huy - Luong 1 (Auth + Guard + App Foundation): WBS 1.0, 2.0, 10.0, 11.0 (phan dung chung) | SP de xuat: 35 | Ticket: FE-STREAM-01
- Han - Luong 2 (Catalog + Search): WBS 3.0, 4.0, 6.0 | SP de xuat: 31 | Ticket: FE-STREAM-02
- Oanh - Luong 3 (User + Admin + Upload): WBS 5.0, 7.0, 8.0, 9.0, 11.0 (phan user-admin feedback) | SP de xuat: 32 | Ticket: FE-STREAM-03

## 9) Dau ra mong doi sau giai doan planning

- Danh sach man hinh can tao moi.
- Danh sach endpoint da map vao man hinh/chuc nang.
- Backlog chia theo sprint P0/P1/P2.
- Danh sach dependency giua module de xep thu tu implement.

## 10) File task chi tiet theo thanh vien

- DOC/Plan/Huy_Task_Spec.md
- DOC/Plan/Han_Task_Spec.md
- DOC/Plan/Oanh_Task_Spec.md
