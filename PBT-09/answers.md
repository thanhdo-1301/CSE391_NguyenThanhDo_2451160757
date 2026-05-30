## CÂU A1-DOM Tree
1. Sơ đồ cây
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   │
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        │
        └── li.todo-item.completed
            └── "Learn CSS"
2. QuerySelector cho từng yêu cầu

Chọn thẻ <h1>

document.querySelector("h1");

Chọn input trong form

document.querySelector("#todoForm input");

Chọn tất cả .todo-item

document.querySelectorAll(".todo-item");

Chọn link đang active

document.querySelector("a.active");

Chọn <li> đầu tiên trong #todoList

document.querySelector("#todoList li:first-child");

Chọn tất cả <a> bên trong <nav>

document.querySelectorAll("nav a");            
## CÂU A2-innerHTML vs textContent
1. Sự khác nhau
    innerHTML	
- Đọc hoặc ghi nội dung dưới dạng HTML	
- Các thẻ HTML sẽ được trình duyệt phân tích	
- Có thể thêm phần tử HTML mới	
- Có nguy cơ bảo mật XSS nếu dùng dữ liệu từ người dùng
    textContent
- Các thẻ HTML sẽ được trình duyệt phân tích	HTML không được phân tích
- HTML không được phân tích
- Chỉ hiển thị chữ
- An toàn hơn khi hiển thị dữ liệu người dùng
Ví dụ khi dùng

Dùng innerHTML khi muốn chèn HTML:

document.querySelector("#box").innerHTML =
"<h2>Xin chào</h2><p>Chào mừng bạn!</p>";

Kết quả:

Xin chào
Chào mừng bạn!

Dùng textContent khi chỉ muốn hiển thị văn bản:

document.querySelector("#box").textContent =
"<h2>Xin chào</h2>";

Kết quả hiển thị:

<h2>Xin chào</h2>

Trình duyệt sẽ không tạo thẻ <h2> mà chỉ hiển thị nguyên chuỗi.

2. Câu hỏi bảo mật: Tại sao innerHTML gây lỗ hổng XSS?

XSS (Cross-Site Scripting) xảy ra khi dữ liệu do người dùng nhập vào được trình duyệt xử lý như mã HTML hoặc JavaScript.

Ví dụ:

// User nhập:
<img src=x onerror="alert('Hacked!')">

const userInput =
document.querySelector("#search").value;

document.querySelector("#result").innerHTML =
userInput;

Vấn đề:

innerHTML sẽ coi chuỗi nhập vào là HTML
Trình duyệt tạo thẻ <img>
Vì ảnh x không tồn tại nên onerror chạy
alert('Hacked!') được thực thi

=> Người khác có thể chèn mã độc, đánh cắp thông tin hoặc thay đổi nội dung trang.

Cách sửa

Dùng textContent:

const userInput =
document.querySelector("#search").value;

document.querySelector("#result").textContent =
userInput;

Lúc này:

<img src=x onerror="alert('Hacked!')">

chỉ được hiển thị như văn bản bình thường, không chạy mã JavaScript.
## Câu A3 (5đ) — Event Bubbling
Khi click vào button, sự kiện xảy ra ở phần tử được click trước rồi nổi bọt (bubbling) lên phần tử cha.
Thứ tự:
button → inner → outer
Code:
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
});
Output khi click button:
BUTTON
INNER
OUTER
Giải thích:
Click xảy ra ở #btn → in "BUTTON"
Sau đó event nổi lên #inner → in "INNER"
Tiếp tục nổi lên #outer → in "OUTER"
Nếu bỏ comment:
e.stopPropagation();
Code:
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
});
Output:
BUTTON
Giải thích:
stopPropagation() chặn sự kiện tiếp tục nổi lên phần tử cha, nên INNER và OUTER sẽ không chạy.

## Câu C1 (8đ) — Debug DOM Code
Các lỗi và cách sửa

1. Sai event "onclick"

Sai:

addEventListener("onclick", ...)

Đúng:

addEventListener("click", ...)

addEventListener() chỉ dùng tên sự kiện (click), không thêm on.

2. Gán sai cho countDisplay

Sai:

countDisplay = count;

Đúng:

countDisplay.textContent = count;

Đang ghi đè biến DOM thành số.

3. countDisplay khai báo bằng const, không thể gán lại

Lỗi này xuất hiện vì đoạn:

countDisplay = count;

sẽ gây lỗi:

Assignment to constant variable

Sửa cùng lỗi số 2.

4. historyList.innerHTML = null

Sai:

historyList.innerHTML = null;

Đúng:

historyList.innerHTML = "";

Nên xóa nội dung bằng chuỗi rỗng.

5. item.remove thiếu dấu ()

Sai:

item.remove;

Đúng:

item.remove();

Đây là gọi hàm.

6. Load count từ localStorage trả về chuỗi

Sai:

count = localStorage.getItem("count");

Đúng:

count = parseInt(localStorage.getItem("count")) || 0;

localStorage lưu dạng string.

Ví dụ:

count++; // "5" → "51"

thay vì:

5 → 6

7. Chưa load history từ localStorage

Đang lưu:

localStorage.setItem("history", historyList.innerHTML);

nhưng không khôi phục.

Thêm:

historyList.innerHTML =
localStorage.getItem("history") || "";

8. Sau khi load history, click vào item cũ sẽ không xóa được

Vì:

historyList.innerHTML = ...

chỉ tạo HTML mới, không gắn event listener.

Sửa:

historyList.addEventListener("click", (e)=>{
    if(e.target.tagName==="LI"){
        deleteHistory(e.target);
    }
});

Dùng event delegation.

Code hoàn chỉnh đã sửa
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;

    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;

    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Event delegation
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        deleteHistory(e.target);
    }
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");

    items.forEach(item => {
        item.remove();
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count")) || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history") || "";
});
## Câu C2 (7đ) — Performance
1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

Ví dụ:

document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", () => {
        console.log("Clicked");
    });
});

Nếu có 1000 phần tử, chương trình sẽ tạo 1000 event listener.

Nhược điểm:

Tốn bộ nhớ vì phải lưu nhiều listener
Giảm hiệu năng khi khởi tạo trang
Khó quản lý code
Khi thêm phần tử mới bằng JavaScript phải gắn listener lại
Không tối ưu với danh sách lớn hoặc dữ liệu động
Event Delegation giải quyết thế nào?

Thay vì gắn event cho từng phần tử, chỉ gắn 1 listener lên phần tử cha rồi dùng event bubbling để xác định phần tử con được click.

Ví dụ:

document.querySelector("#container")
.addEventListener("click", (e) => {

    if (e.target.classList.contains("item")) {
        console.log("Clicked");
    }

});

Cách này có ưu điểm:

Chỉ cần 1 listener
Tiết kiệm bộ nhớ
Dễ bảo trì
Các phần tử tạo thêm sau này tự hoạt động
Tăng hiệu năng
2. Refactor dùng DocumentFragment

Code ban đầu:

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);
}

Vấn đề:

document.body.appendChild(div);

chạy 1000 lần, mỗi lần DOM thay đổi trình duyệt có thể phải:

tính lại layout (reflow)
tính lại vị trí phần tử
render lại giao diện

=> gây nhiều thao tác tốn tài nguyên.

Code đã refactor
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;

    fragment.appendChild(div);
}

document.body.appendChild(fragment);
Tại sao nhanh hơn?

DocumentFragment là vùng chứa tạm trong bộ nhớ, chưa nằm trong DOM thật.

Quy trình:

Tạo 1000 phần tử trong bộ nhớ
Thêm vào fragment
Gắn fragment vào DOM một lần

Kết quả:

Chỉ 1 lần cập nhật DOM
Giảm số lần reflow/repaint
Tốn ít tài nguyên hơn
Tốc độ nhanh hơn khi xử lý nhiều phần tử