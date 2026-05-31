# PHIẾU BÀI TẬP 05

## PHẦN A

### Câu A1:

1. Thẻ `<meta viewport>` chuẩn:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

> `width=device-width`: Đặt chiều rộng của viewport bằng chiều rộng màn hình thiết bị

> `iinitial-scale=1.0`: Thiết lập mức độ thu phóng ban đầu là 100% khi tải trang

2. Trình duyệt giả lập là một màn hình desktop, rồi ép nhỏ toàn bộ giao diện lại để vừa với màn hình điện thoại. Chữ và nút bấm sẽ cực kỳ nhỏ cho nên người dùng rất khó đọc và thao tác

3. Mobile-first thiết kế và lập trình cho màn hình nhỏ (Mobile) trước. Sau đó dùng Media Queries để thêm tính năng, mở rộng giao diện cho màn hình lớn (Desktop). Desktop-first thiết kế và lập trình cho màn hình lớn (Desktop) trước. Sau đó dùng Media Queries để thu gọn, ẩn bớt hoặc sắp xếp lại giao diện cho màn hình nhỏ (Mobile).

**Ví dụ:**

```css
/* Code mặc định cho Mobile (Màn hình < 768px) */
.container {
  display: flex;
  flex-direction: column;
}

.item {
  width: 100%;
}

/* Điều kiện cho Desktop (Màn hình từ 768px trở lên) */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }

  .item {
    width: 33.33%;
  }
}
```

**Mobile first được khuyên dùng hơn vì:**

- **Tối ưu hiệu năng:** Mobile có phần cứng yếu và mạng chậm hơn Desktop. Viết code Mobile-First giúp thiết bị di động tải ít CSS hơn, không phải ghi đè (override) các thuộc tính nặng của Desktop.

- **60% lưu lượng truy cập:** Phần lớn người dùng hiện nay lướt web bằng điện thoại. Thiết kế ưu tiên Mobile giúp tiếp cận khách hàng tốt hơn.

- **Tốt cho SEO:** Google áp dụng thuật toán Mobile-First Indexing. Họ sẽ dùng giao diện Mobile của website để đánh giá và xếp hạng trên kết quả tìm kiếm.

### Câu A2:

| Tên    | Kích thước | Số lượng cột  | Thiết bị         |
| :----- | :--------- | :------------ | :--------------- |
| **xs** | < 576px    | 1 cột         | Điện thoại dọc   |
| **sm** | ≥ 576px    | 2 cột         | Điện thoại ngang |
| **md** | ≥ 768px    | 3 cột         | Tablet           |
| **lg** | ≥ 992px    | 4 cột         | Desktop nhỏ      |
| **xl** | ≥ 1200px   | 6 hoặc 12 cột | Desktop lớn      |

### Câu A3:

| Chiều rộng màn hình   | .container width | Giải thích                                                                   |
| :-------------------- | :--------------- | :--------------------------------------------------------------------------- |
| **375px** (iPhone SE) | **100%**         | Nhỏ hơn 576px, nhận giá trị mặc định bên ngoài media query.                  |
| **600px**             | **540px**        | Nằm trong khoảng từ 576px đến 767px, thỏa mãn điều kiện `min-width: 576px`.  |
| **800px**             | **720px**        | Nằm trong khoảng từ 768px đến 991px, thỏa mãn điều kiện `min-width: 768px`.  |
| **1000px**            | **960px**        | Nằm trong khoảng từ 992px đến 1199px, thỏa mãn điều kiện `min-width: 992px`. |
| **1400px**            | **1140px**       | Lớn hơn 1200px, thỏa mãn điều kiện cuối cùng `min-width: 1200px`.            |

### Câu A4:

1. **Variables:** Lưu trữ các giá trị sử dụng nhiều lần (màu sắc, font, spacing) để dễ quản lý, thay đổi một nơi là thay đổi toàn bộ.

**Ví dụ:**

```scss
$primary-color: #3498db;
button {
  color: $primary-color;
}
```

2. **Nesting (CSS Lồng nhau):** Viết các selector lồng nhau theo cấu trúc phân cấp của HTML, giúp code gọn gàng, rõ ràng.

**Ví dụ:**

```scss
nav {
  ul {
    list-style: none;
  }
  li {
    display: inline-block;
  }
}
```

3. **Mixins (Hàm tái sử dụng):** Gom một cụm thuộc tính CSS lại thành một hàm, có thể truyền tham số vào để tái sử dụng linh hoạt.

**Ví dụ:**

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  @include flex-center;
}
```

4. **@extend / Inheritance (Kế thừa):** Cho phép một selector chia sẻ/kế thừa toàn bộ thuộc tính CSS của một selector khác nhằm tránh trùng lặp code.

**Ví dụ:**

```scss
.error-base {
  border: 1px solid red;
  color: red;
}
.critical-error {
  @extend .error-base;
  font-weight: bold;
}
```

**Tại sao trình duyệt KHÔNG đọc được file .scss? Cần bước gì để chuyển SCSS → CSS?**

> Trình duyệt web chỉ hiểu và biên dịch được file định dạng `.css` tiêu chuẩn theo đặc tả của W3C. File `.scss` chứa các cú pháp nâng cao (biến, lồng, hàm) nằm ngoài đặc tả này.

> **Giải pháp:** Cần sử dụng một công cụ biên dịch như `Sass CSS Compiler` (Extension VS Code) hoặc cài đặt gói `sass` qua npm để biên dịch tệp `.scss` thành tệp `.css` thuần trước khi nhúng vào HTML.

## PHẦN B

### Câu B3:

Để thực hiện biên dịch hệ thống file Sass thành CSS chuẩn cho trình duyệt đọc, lập trình viên sử dụng một trong hai phương thức sau:

**Cách 1:** Sử dụng Command Line (NPM Sass Compiler)
Yêu cầu hệ thống đã cài đặt NodeJS. Tiến hành mở Terminal tại thư mục gốc của dự án và chạy câu lệnh:

```bash
# Cài đặt trình biên dịch sass toàn cục
npm install -g sass

# Chạy lệnh biên dịch một lần từ thư mục chứa mã nguồn scss sang css mục tiêu
sass scss/style.scss css/responsive.css

# Chạy chế độ tự động lắng nghe cập nhật liên tục mỗi khi lưu file
sass scss/style.scss css/responsive.css --watch
```

**Cách 2:** Sử dụng Extension VS Code (Live Sass Compiler)
Truy cập chợ ứng dụng Extensions trên VS Code (Ctrl + Shift + X).

Tìm và cài đặt Extension có tên Live Sass Compiler (tác giả Glenn Marks).

Mở tệp chính scss/style.scss, nhấp chuột vào thanh trạng thái nằm ở viền đáy phần mềm có chữ "Watch Sass".

Tiện ích sẽ tự động tạo cấu trúc thư mục chứa file sản phẩm scss/style.css cùng cấu trúc sơ đồ bản đồ style.css.map song song đồng bộ hoàn chỉnh.

## PHẦN C

### Câu C1:

**Mobie (375px):**

![alt text](<./screenshot/img1(375)-C1.png>)

**Tablet (768px):**

![alt text](<./screenshot/img2(768)-C1.png>)

**Desktop (1440px):**

![alt text](<./screenshot/img3(1440)-C1.png>)

- **Navigation:**
  - **Desktop (1440px):** Thanh menu ngang hiển thị đầy đủ danh mục chính (Thời sự, Góc nhìn, Thế giới, Kinh doanh...). Có thêm thanh sub-menu cố định khi cuộn.
  - **Tablet (768px):** Menu ngang thu gọn, chỉ giữ lại 4-5 danh mục quan trọng nhất. Các danh mục còn lại gom vào nút Hamburger Menu `☰` ở góc trái. \*
  - **Mobile (375px):** 100% danh mục ngang bị ẩn. Thay thế hoàn toàn bằng nút Hamburger `☰` chứa toàn bộ cây thư mục trang web. Logo căn giữa, icon tìm kiếm/tài khoản thu nhỏ dạng tối giản.
- **Lưới nội dung (Content Grid):**
  - **Desktop:** Layout 3 cột (Cột 1: Tin tiêu điểm lớn; Cột 2: Danh sách tin tức phụ; Cột 3: Widget dòng sự kiện, thời tiết, chứng khoán và Banner Quảng cáo).
  - **Tablet:** Chuyển sang layout 2 cột. Tin tiêu điểm chiếm toàn bộ chiều rộng hàng đầu tiên, các tin phụ xếp thành lưới 2 cột phía dưới. Cột 3 (Quảng cáo/Widget) bị đẩy xuống đáy trang.
  - **Mobile:** Layout 1 cột duy nhất (Single-column stream). Tất cả bài viết xếp chồng theo chiều dọc từ trên xuống dưới để tối ưu thao tác vuốt cuộn ngón cái.
- **Thành phần bị ẩn trên Mobile:**
  - Toàn bộ hệ thống banner quảng cáo hai bên sườn (Background ads).
  - Các widget tiện ích phụ (Bảng giá vàng, chứng khoán, dự báo thời tiết chi tiết theo giờ).
  - Khối bình luận trực tiếp bên cạnh bài viết.
- **Biến đổi Font Size:**
  - Tiêu đề bài viết lớn (h1) trên Desktop sử dụng `32px` -> Hạ xuống `26px` trên Tablet -> Giản lược còn `20px` - `22px` trên Mobile để tránh vỡ dòng và tràn màn hình.

## Câu C2 — Thiết kế Responsive Strategy & CSS Skeleton

### 1. Sơ đồ bố cục Wireframe (Dạng văn bản trực quan)

**MOBILE LAYOUT (<768px)**
-   **Thành phần bị ẩn:** Ẩn text số điện thoại hiển thị (thay thế bằng icon Hotline dạng sticky/floating rút gọn).
-   **Vị trí Form:** Xếp dọc, nằm ngay phía dưới Grid ảnh món ăn và nằm phía trên Bản đồ Google Maps. Form chiếm full 100% chiều rộng màn hình.
```text
┌──────────────────────────────────┐
│ HEADER (Logo | [Icon Call])      │
├──────────────────────────────────┤
│ HERO IMAGE (Chiều cao thu gọn)   │
├──────────────────────────────────┤
│ FOOD GRID (Lưới 2 cột)           │
│ [Ảnh 1] [Ảnh 2]                  │
│ [Ảnh 3] [Ảnh 4]                  │
│ [Ảnh 5] [Ảnh 6]                  │
├──────────────────────────────────┤
│ BOOKING FORM (1 cột full-width)  │
├──────────────────────────────────┤
│ GOOGLE MAPS (Chiều cao 250px)    │
├──────────────────────────────────┤
│ FOOTER                           │
└──────────────────────────────────┘
```

**TABLET LAYOUT (768px - 1023px)**

- **Lưới ảnh món ăn:** Chia thành lưới 3 cột x 2 hàng (repeat(3, 1fr)).
- **Vị trí Bản đồ:** Tiếp tục xếp chồng theo chiều dọc ở phía dưới Form đặt bàn, nhưng kích thước chiều cao được đẩy lên 350px để dễ quan sát.
```text
┌──────────────────────────────────┐
│ HEADER (Logo | Hotline: 1900xxx) │
├──────────────────────────────────┤
│ HERO IMAGE (Chiều cao trung bình)│
├──────────────────────────────────┤
│ FOOD GRID (Lưới 3 cột)           │
│ [Ảnh 1]   [Ảnh 2]   [Ảnh 3]      │
│ [Ảnh 4]   [Ảnh 5]   [Ảnh 6]      │
├──────────────────────────────────┤
│ BOOKING FORM (Full-width)        │
├──────────────────────────────────┤
│ GOOGLE MAPS (Full-width, 350px)  │
├──────────────────────────────────┤
│ FOOTER                           │
└──────────────────────────────────┘
```

**DESKTOP LAYOUT (≥1024px) — Hệ lưới đa cột phối hợp Layout 60/40**

- **Hệ lưới tổng thể:** Hệ lưới 12 cột (grid-template-columns: repeat(12, 1fr)).

- **Số cột lưới ảnh:** Đạt tối đa 6 cột trên cùng 1 hàng ngang (repeat(6, 1fr)).

- **Cấu trúc Sidebar:** sử dụng cấu trúc Sidebar. Khu vực chức năng chính được chia làm 2 cột song song: Vùng chính bên trái (chiếm 7 cột) chứa Form đặt bàn; Vùng Sidebar bên phải (chiếm 5 cột) chứa Bản đồ Google Maps nhúng.

```css
/* Mobile first */
.restaurant-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .phone-text { 
  display: none;
} 

.hero {
  width: 100%;
  height: 50vh;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.booking-form {
  width: 100%;
}

.map-embed {
  width: 100%;
  height: 250px;
}

.footer {
  text-align: center;
  padding: 20px;
}

@media (min-width: 768px) {
  .restaurant-container {
    padding: 24px;
    gap: 24px;
  }

  .header .phone-text { 
    display: block;
  }

  .food-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .map-embed {
    height: 350px;
  }
}
@media (min-width: 1024px) {
  .restaurant-container {
    grid-template-columns: repeat(12, 1fr);
    max-width: 1200px;
    margin: 0 auto;
  }

  .header, .hero, .food-grid, .footer {
    grid-column: span 12;
  }

  .food-grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .booking-form {
    grid-column: span 7;
  }

  .map-embed {
    grid-column: span 5;
    height: 100%;
  }
}
```