# PHIẾU BÀI TẬP 06

## TRACK A

### PHẦN A

#### Câu A1:

##### 1. Bảng phân tích cấu trúc Layout

| Kích thước | `< 768px` (Mobile) | `768px - 991px` (Tablet) | `≥ 992px` (Desktop)                                    |
| :------ | :----- | :----- | :------ |
| **Số cột hiển thị** | 1 cột / hàng | 2 cột / hàng | 4 cột / hàng                                           |
| **Box Layout**      | 4 dòng xếp chồng dọc. Mỗi Box chiếm 12/12 cột. | 2 dòng, mỗi dòng 2 cột. Mỗi Box chiếm 6/12 cột. | 1 dòng duy nhất chứa cả 4 Box. Mỗi Box chiếm 3/12 cột. |

##### 2. Câu hỏi thêm

- `col-md-6`: Nghĩa là trên các thiết bị có kích thước màn hình từ mức **Medium trở lên (≥768px)**, phần tử này sẽ chiếm kích rải là **6/12 cột** (tương đương 50% chiều rộng của hàng chứa nó).
- **Tại sao không cần viết `col-sm-12`?** Vì Bootstrap vận hành theo tư duy ưu tiên thiết bị di động trước (Mobile-First). Lớp cơ sở `col-12` đã khai báo phần tử chiếm trọn vẹn 100% chiều rộng từ kích thước nhỏ nhất (`xs`). Do đó, trạng thái này sẽ tự động kế thừa lên mức màn hình `sm` mà không cần viết lại mã thừa.

#### Câu A2:

##### 1. Lớp `d-none d-md-block`

- **Ẩn khi nào:** Ẩn hoàn toàn trên các màn hình có độ rộng nhỏ hơn 768px (`xs` và `sm`). Do đặc tính của thuộc tính `d-none` hoạt động từ mốc cơ sở.
- **Hiển thị khi nào:** Bắt đầu hiển thị bình thường dưới dạng phần tử khối (`display: block`) khi màn hình đạt kích thước từ **768px trở lên (≥768px)** nhờ lớp ghi đè `d-md-block`.

##### 2. Danh sách 5 Spacing Utilities phổ biến

- `mt-3`: Cài đặt `margin-top` ở mức số 3 (Mặc định bằng `1rem` hay `16px` theo cấu hình Bootstrap).
- `px-4`: Cài đặt đồng thời cả `padding-left` và `padding-right` ở mức số 4 (`1.5rem` hay `24px`).
- `mb-auto`: Cài đặt `margin-bottom: auto`. Thường dùng trong Flexbox để đẩy phần tử kế tiếp xuống đáy.
- `ms-2`: Cài đặt `margin-left` (Margin Start) ở mức số 2 (`0.5rem` hay `8px`).
- `pb-5`: Cài đặt `padding-bottom` ở mức số 5 mức tối đa (`3rem` hay `48px`).

##### 3. Phân biệt các lớp Container

- `.container`: Cài đặt chiều rộng tối đa (`max-width`) cố định thay đổi nhảy bậc theo từng mốc Breakpoint (`sm`, `md`, `lg`, `xl`, `xxl`).
- `.container-fluid`: Cố định luôn chiếm toàn bộ không gian **chiều rộng 100%** ở mọi cấu hình màn hình thiết bị.
- `.container-md`: Trải phẳng chiếm 100% chiều rộng khi ở màn hình nhỏ hơn 768px, và bắt đầu thu hẹp giữ cố định `max-width` từ mốc màn hình `md` (768px) trở lên.

### PHẦN B:

#### CÂU B1:

- Mobile (375px):
![alt text](./screenshots/img(375)-B1.png)

- Tablet (768px):
![alt text](./screenshots/img(768)-B1.png)

- Desktop (1200px):
![alt text](./screenshots/img(1200)-B1.png)


### PHẦN C

#### Câu C1 

##### 1. Quy trình thay đổi biến màu sắc hệ thống

> Để đổi màu gốc `$primary` sang mã màu `#E63946`, chúng ta không can thiệp vào tệp core của thư viện mà thực hiện qua quy trình biên dịch gói Sass:

1.  **Công cụ cần dùng:** Khởi tạo môi trường NodeJS, cài đặt thư viện biên dịch `sass` (hoặc cài extension _Live Sass Compiler_ trong VS Code).
2.  **Khởi tạo cấu trúc tệp:** Tạo tệp có tên `custom.scss`.
3.  **Viết mã ghi đè hệ thống:**

```scss
$primary: #e63946;

@import "../node_modules/bootstrap/scss/bootstrap";
```
4. **Biên dịch:** Chạy lệnh sass custom.scss css/custom.css. Trình biên dịch sẽ tự động ánh xạ biến màu mới này vào toàn bộ các class phụ thuộc như .btn-primary, .text-primary, .bg-primary.

##### 2. Tại sao không nên override trực tiếp bằng CSS thuần?
> Nếu dùng `.btn-primary { background: red; }` chỉ sửa được nền của duy nhất nút đó. Trong khi đó, biến gốc $primary của Bootstrap phân nhánh tới hàng trăm lớp khác (màu border, trạng thái :hover, :focus, màu văn bản, nền alerts, badges, trạng thái active của phân trang). Sửa trực tiếp bằng CSS thuần sẽ làm mất tính đồng bộ nhất quán của giao diện và tạo ra lượng mã nguồn trùng lặp khổng lồ khó bảo trì.

#### Câu C2:

| Tiêu chí so sánh | Viết CSS thuần (Custom CSS) | Sử dụng thư viện Bootstrap 5 |
| :--- | :--- | :--- |
| **Số dòng mã cần viết** | Rất nhiều (Từ 60 - 100 dòng cho cả Grid, Flexbox, Media Queries). | Gần như bằng 0, chỉ cần chỉ định tên class vào cấu trúc HTML. |
| **Thời gian phát triển** | Chậm. Mất nhiều công sức kiểm thử thủ công lỗi tràn dòng, căn chỉnh thiết bị. | Cực nhanh. Các block thành phần đã được chuẩn hóa, lắp ghép ăn khớp ngay. |
| **Khả năng tùy biến** | Tuyệt đối. Tự do kiểm soát từng pixel theo ý muốn thiết kế riêng biệt. | Bị gò bó theo khuôn mẫu có sẵn, nếu muốn tùy biến sâu phải cấu hình qua Sass. |

**Khi nào NÊN dùng Bootstrap:**
- Xây dựng các dự án có tiến độ gấp, các sản phẩm chạy thử nghiệm.

- Làm trang quản trị nội bộ, các hệ thống doanh nghiệp không đòi hỏi quá khắt khe về nhận diện thiết kế riêng biệt độc quyền.

**Khi nào KHÔNG NÊN dùng Bootstrap:**
- Các website mang tính nghệ thuật cao, creative agency, portfolio đòi hỏi bố cục độc lạ, phá cách.

- Dự án tối ưu hóa hiệu năng tải trang. Bootstrap mang theo nhiều CSS/JS dư thừa không dùng tới nếu chỉ làm trang web tĩnh đơn giản.





