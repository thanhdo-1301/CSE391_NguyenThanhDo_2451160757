# 📋 PHIẾU BÀI TẬP 04 — ANSWERS

---

# **PHẦN A — KIỂM TRA ĐỌC HIỂU (20đ)**

## **Câu A1 (10đ) — 5 Loại Positioning**

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí           | Cuộn theo trang?                  | Use case                              |
| ---------- | ------------------------- | --------------------------- | --------------------------------  | ------------------------------|
| `static`   | Có                        | Flow bình thường              |  Có                                 | Layout mặc định                       |
| `relative` |  Có                       | So với chính nó              |  Có                                | Dịch chuyển nhẹ, làm mốc cho absolute |
| `absolute` |  Không                   | Nearest positioned ancestor  |  Không (không theo scroll độc lập) | Badge, overlay                        |
| `fixed`    |  Không                   | Viewport                     |  Không (luôn cố định)              | Header, button                        |
| `sticky`   |  Có (ban đầu)            | Parent + viewport            |  Có (đến ngưỡng thì dính)          | Sidebar dính                          |

---

### **Câu hỏi thêm**

**Khi nào `absolute` tham chiếu `body`?**
→ Khi **không có ancestor nào có `position` khác `static`**, phần tử `absolute` sẽ lấy `body` (hoặc viewport) làm mốc.

**Khi nào tham chiếu parent?**
→ Khi có **ancestor gần nhất** có:

```css
position: relative | absolute | fixed | sticky;
```

---

### **Nearest Positioned Ancestor là gì?**

Là **phần tử cha gần nhất (ancestor gần nhất)** có `position` khác `static`.

 Phần tử `absolute` sẽ dùng phần tử này làm hệ tọa độ để định vị (`top`, `left`, ...)

**Ví dụ:**

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

→ `.child` sẽ bám theo `.parent`, không phải `body`.

---

## **Câu A2 (10đ) — Dự đoán Layout**

### **Trường hợp 1**

```css
.container { display: flex; }
.item { flex: 1; }
```

 4 items → **1 hàng, chia đều**

```
| 1 | 2 | 3 | 4 |
```

---

### **Trường hợp 2**

```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
```

 6 items → **2 items mỗi hàng**

```
| 1 | 2 |
| 3 | 4 |
| 5 | 6 |
```

→ Tổng: **3 hàng, 2 cột**

---

### **Trường hợp 3**

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

 3 items:

```
|1        2        3|
     (căn giữa theo chiều dọc)
```

---

### **Trường hợp 4**

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}
```

 3 items:

```
| 200px |   flexible   | 200px |
|   1   |      2       |   3   |
```

---

### **Trường hợp 5**

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

 7 items:

```
|1|2|3|
|4|5|6|
|7| | |
```

→ **3 cột, 3 hàng**
→ Item 7 nằm **hàng 3, cột 1**

---

# **PHẦN C — SUY LUẬN (20đ)**

## **Câu C1 (10đ) — Flexbox vs Grid**

| Tình huống               | Giải pháp | Giải thích                     |
| ------------------------ | --------- | ------------------------------ |
| 1. Navbar ngang          | Flexbox   | Layout 1 chiều (row)           |
| 2. Grid ảnh Instagram    | Grid      | Layout 2 chiều (row + column)  |
| 3. Blog (main + sidebar) | Grid      | Chia layout tổng thể rõ ràng   |
| 4. Footer 4 cột          | Grid      | Chia đều nhiều cột             |
| 5. Card sản phẩm         | Flexbox   | Layout dọc + control alignment |

Quy tắc nhanh:

* **Flexbox → 1 chiều**
* **Grid → 2 chiều**

---

## **Câu C2 (10đ) — Debug Flexbox**

### **Lỗi 1: Card không đều chiều cao, nút bị lệch**

**Nguyên nhân:**

* Nội dung khác nhau → chiều cao card khác nhau
* Không dùng flex column → nút không dính đáy

###  **Cách sửa**

```css
.card {
  display: flex;
  flex-direction: column;
}

.card .btn {
  margin-top: auto;
}
```

---

### **Lỗi 2: Không căn giữa nội dung**

**Nguyên nhân:**

* Thiếu `justify-content` và `align-items`

###  **Fix**

```css
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

### **Lỗi 3: Sidebar bị co lại**

**Nguyên nhân:**

* Flex mặc định có `flex-shrink: 1` → bị co khi thiếu chỗ

###  **Fix**

```css
.sidebar {
  width: 250px;
  flex-shrink: 0;
}
```

---

#  **KẾT LUẬN**

* `absolute` phụ thuộc **nearest positioned ancestor**
* Flexbox phù hợp layout **1 chiều**
* Grid phù hợp layout **2 chiều**
* `margin-top: auto` giúp đẩy element xuống đáy
* `flex-shrink: 0` giúp giữ kích thước phần tử
