# K66 – BTTH03 – HTML, CSS, JS DOM

## Mục tiêu

Sinh viên xây dựng 02 bài thực hành bằng HTML, CSS, JavaScript thuần, tập trung mạnh vào:

1. DOM
2. Xử lý sự kiện

Yêu cầu ưu tiên là hiểu cách:
- lấy phần tử
- thay đổi nội dung giao diện
- hiển thị/ẩn thành phần
- bắt sự kiện người dùng
- cập nhật dữ liệu lên giao diện

Không yêu cầu:
- tìm kiếm nâng cao
- lọc nâng cao

---

# Phạm vi kiến thức cần tập trung

---

## 1. DOM

Sinh viên cần luyện các nội dung sau:

- Chọn phần tử bằng:
  - `getElementById`
  - `querySelector`
  - `querySelectorAll`

- Thay đổi nội dung bằng:
  - `innerText`
  - `innerHTML`
  - `textContent`
  - `value`

- Thay đổi:
  - thuộc tính
  - class của phần tử

- Hiển thị và ẩn:
  - popup
  - form

- Tạo và cập nhật:
  - danh sách dữ liệu từ JavaScript
  - bảng dữ liệu

- Render lại:
  - bảng
  - danh sách

- Làm việc với:
  - phần tử cha
  - phần tử con
  - phần tử anh em

---

## 2. Xử lý sự kiện

Sinh viên cần luyện mạnh các nội dung sau:

- Bắt sự kiện `click`
- Bắt sự kiện `submit`
- Bắt sự kiện `change`

- Gắn sự kiện cho:
  - nút thêm
  - nút sửa
  - nút xóa
  - nút đóng form

- Phân biệt thao tác của người dùng trên từng nút

- Hiển thị:
  - thông báo
  - xác nhận xóa
  - cập nhật giao diện

- Làm quen với:
  - event delegation cơ bản

---

# Bài 1 — Quản lý sinh viên

---

## Mô tả

Xây dựng trang quản lý sinh viên bằng:

- HTML
- CSS
- JavaScript thuần

---

## Chức năng cần có

- Hiển thị danh sách sinh viên dạng bảng
- Có nút thêm sinh viên
- Hiển thị popup/modal form
- Thêm sinh viên mới
- Sửa sinh viên
- Xóa sinh viên
- Xác nhận trước khi xóa
- Cập nhật bảng ngay sau thao tác
- Hiển thị tổng số sinh viên
- Hiển thị điểm trung bình lớp
- Lưu dữ liệu bằng `localStorage`

---

## Các trường thông tin gợi ý

- Mã sinh viên
- Họ và tên
- Ngày sinh
- Lớp học
- Điểm trung bình
- Email

---

## Yêu cầu giao diện

- Có tiêu đề trang
- Có khu vực nút thêm sinh viên
- Có bảng dữ liệu
- Có popup form
- Có khu vực thông báo
- Có khu vực thống kê

---

## Phân tích thành phần DOM cần xử lý

Sinh viên cần xác định rõ:

- Nút mở form
- Nút đóng form
- Form nhập liệu
- Các input/select
- Phần thân bảng
- Khu vực thông báo
- Khu vực thống kê

---

## Các xử lý sự kiện bắt buộc

1. Click mở form thêm sinh viên
2. Click đóng form
3. Submit form thêm dữ liệu
4. Click nút sửa
5. Submit form cập nhật
6. Click nút xóa

---

# Luồng xử lý cần triển khai

---

## A. Hiển thị danh sách

- Tạo mảng dữ liệu sinh viên
- Đọc dữ liệu từ `localStorage`
- Render dữ liệu ra bảng
- Hiển thị trạng thái rỗng nếu chưa có dữ liệu

---

## B. Thêm sinh viên

- Mở popup
- Nhập dữ liệu
- Lấy dữ liệu từ form
- Tạo object sinh viên
- Push vào mảng
- Lưu `localStorage`
- Render lại bảng
- Cập nhật thống kê
- Reset form

---

## C. Sửa sinh viên

- Xác định đúng sinh viên cần sửa
- Đưa dữ liệu cũ lên form
- Chuyển form sang chế độ cập nhật
- Cập nhật dữ liệu
- Lưu `localStorage`
- Render lại bảng
- Cập nhật thống kê

---

## D. Xóa sinh viên

- Hiển thị xác nhận
- Xóa dữ liệu khỏi mảng
- Lưu `localStorage`
- Render lại bảng
- Cập nhật thống kê

---

## Nội dung giảng dạy nên nhấn mạnh

- Cách lấy dữ liệu từ form
- Cách render dữ liệu ra HTML
- Cách dùng chung form cho thêm/sửa
- Cách xác định nút được bấm
- Cách cập nhật giao diện
- Cách tách hàm:
  - `renderStudents()`
  - `saveStudents()`
  - `resetForm()`
  - `updateStatistics()`

---

# Bài 2 — Quản lý công việc cá nhân

---

## Mô tả

Xây dựng ứng dụng quản lý công việc bằng:

- HTML
- CSS
- JavaScript thuần

---

## Chức năng cần có

- Hiển thị danh sách công việc
- Thêm công việc
- Sửa công việc
- Xóa công việc
- Xác nhận trước khi xóa
- Đánh dấu hoàn thành
- Cập nhật giao diện ngay
- Hiển thị thống kê
- Lưu `localStorage`

---

## Các trường thông tin gợi ý

- Tiêu đề công việc
- Mô tả ngắn
- Hạn hoàn thành
- Mức ưu tiên
- Trạng thái hoàn thành

---

## Giới hạn yêu cầu

Không làm:

- tìm kiếm
- lọc trạng thái
- lọc mức ưu tiên
- framework

---

## Yêu cầu giao diện

- Có tiêu đề
- Có nút thêm công việc
- Có danh sách công việc
- Có popup form
- Có thống kê
- Có thông báo

---

## Phân tích DOM cần xử lý

- Nút mở form
- Nút đóng form
- Form nhập liệu
- Danh sách công việc
- Nút sửa
- Nút xóa
- Nút đổi trạng thái
- Khu vực thông báo
- Khu vực thống kê

---

## Các xử lý sự kiện bắt buộc

1. Click mở form
2. Click đóng form
3. Submit form
4. Click sửa
5. Click xóa
6. Click/change trạng thái hoàn thành

---

# Luồng xử lý cần triển khai

---

## A. Hiển thị danh sách

- Tạo mảng dữ liệu
- Đọc `localStorage`
- Render dữ liệu
- Hiển thị trạng thái rỗng

---

## B. Thêm công việc

- Mở popup
- Nhập dữ liệu
- Tạo object công việc
- Push vào mảng
- Lưu `localStorage`
- Render lại
- Cập nhật thống kê

---

## C. Sửa công việc

- Đưa dữ liệu cũ lên form
- Chuyển sang chế độ cập nhật
- Cập nhật dữ liệu
- Render lại
- Cập nhật thống kê

---

## D. Xóa công việc

- Xác nhận xóa
- Xóa dữ liệu
- Lưu `localStorage`
- Render lại
- Cập nhật thống kê

---

## E. Đổi trạng thái hoàn thành

- Click checkbox/nút hoàn thành
- Cập nhật trạng thái
- Đổi class CSS
- Lưu `localStorage`
- Cập nhật thống kê

---

## Nội dung giảng dạy nên nhấn mạnh

- Render danh sách động
- Xử lý nhiều nút thao tác
- Đổi class theo trạng thái
- Cập nhật thống kê
- Tách hàm:
  - `renderTasks()`
  - `saveTasks()`
  - `showMessage()`
  - `updateTaskSummary()`

---

# Tổ chức bài học trên lớp

---

## Giai đoạn 1 — Dựng khung HTML

- Tạo layout giao diện
- Xác định id/class
- Chưa xử lý dữ liệu

---

## Giai đoạn 2 — DOM cơ bản

- Lấy phần tử
- Thay đổi nội dung
- Hiển thị/ẩn popup

---

## Giai đoạn 3 — Xử lý sự kiện

- Gắn sự kiện click
- Gắn submit
- Gắn sự kiện cho CRUD

---

## Giai đoạn 4 — CRUD

- Thêm dữ liệu
- Hiển thị dữ liệu
- Sửa dữ liệu
- Xóa dữ liệu

---

## Giai đoạn 5 — Hoàn thiện

- Lưu `localStorage`
- Thông báo thao tác thành công
- Cập nhật thống kê
- Hoàn thiện CSS

---

# Bài tập về nhà — Form Validation

---

## Yêu cầu tối thiểu

- Không để trống
- Email đúng định dạng
- Điểm là số hợp lệ
- Ngày hợp lệ

---

## Yêu cầu nâng cao

- Kiểm tra mã sinh viên
- Kiểm tra độ dài chuỗi
- Kiểm tra khoảng giá trị
- Xác nhận mật khẩu
- Hiển thị lỗi dưới input
- Không submit nếu dữ liệu sai

---

## Mục tiêu

- Rèn tư duy kiểm tra dữ liệu
- Tách validation khỏi giao diện
- Chuẩn bị cho form phức tạp hơn

---

# Gợi ý chấm điểm

| Nội dung | Điểm |
|---|---|
| HTML đầy đủ | 2 |
| DOM hợp lý | 2 |
| Xử lý sự kiện | 3 |
| CRUD hoàn chỉnh | 2 |
| Giao diện + thống kê | 1 |

---

# Checklist cho sinh viên

---

## Checklist DOM

- Đã lấy đúng phần tử
- Đã thay đổi nội dung
- Đã hiển thị/ẩn popup
- Đã render dữ liệu
- Đã cập nhật giao diện

---

## Checklist xử lý sự kiện

- Đã bắt click
- Đã bắt submit
- Đã xử lý thêm/sửa/xóa
- Đã xác nhận trước khi xóa
- Đã hiển thị thông báo
- Đã cập nhật giao diện sau thao tác

---

# Yêu cầu cuối cùng

- Không code sẵn toàn bộ bài
- Sinh viên phải tự xây dựng từng phần
- Ưu tiên hiểu flow xử lý
- Tập trung vào:
  - DOM
  - xử lý sự kiện
- Validation làm bài tập về nhà
