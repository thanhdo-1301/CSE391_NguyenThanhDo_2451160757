ĐÁP ÁN PHẦN A + C1 - PHIẾU BÀI TẬP 07
PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
Câu A1 (5đ) — var / let / const
Dự đoán kết quả:

Đoạn	Code	Dự đoán	Giải thích
1	console.log(x); var x = 5;	undefined	var bị hoisting (đưa lên đầu), khai báo nhưng chưa gán giá trị
2	console.log(y); let y = 10;	ReferenceError	let có Temporal Dead Zone (TDZ), không truy cập trước khai báo
3	const z = 15; z = 20;	TypeError	const không thể gán lại giá trị mới
4	const arr = [1,2,3]; arr.push(4);	[1,2,3,4]	const chỉ ngăn gán lại tham chiếu, không ngăn thay đổi nội dung
5	let a=1; { let a=2; }	Trong block: 2
Ngoài block: 1	let có block scope, biến trong block độc lập với biến ngoài
Câu A2 (5đ) — Data Types & Coercion
Dự đoán kết quả:

Code	Kết quả	Giải thích
typeof null	"object"	Lỗi lịch sử của JavaScript
typeof undefined	"undefined"	Kiểu của biến chưa gán giá trị
typeof NaN	"number"	NaN là giá trị số đặc biệt
"5" + 3	"53"	+ ưu tiên nối chuỗi khi có string
"5" - 3	2	- ép cả hai về number
"5" * "3"	15	* ép cả hai về number
true + true	2	true ép thành 1
[] + []	""	Mảng rỗng ép thành chuỗi rỗng
[] + {}	"[object Object]"	[] → "", {} → "[object Object]"
{} + []	"[object Object]"	{} → "[object Object]", [] → ""
Giải thích "5" + 3 vs "5" - 3:

"5" + 3: Toán tử + khi gặp string sẽ ưu tiên nối chuỗi, ép 3 thành "3" → "53"

"5" - 3: Toán tử - chỉ làm việc với số, ép "5" thành 5 → 5 - 3 = 2

Câu A3 (5đ) — So sánh == vs ===
Dự đoán kết quả:

Code	Kết quả	Giải thích
5 == "5"	true	== ép kiểu: "5" → 5
5 === "5"	false	=== không ép kiểu, số khác string
null == undefined	true	== coi null và undefined bằng nhau
null === undefined	false	=== thấy khác kiểu
NaN == NaN	false	NaN không bằng chính nó
0 == false	true	false → 0
0 === false	false	số khác boolean
"" == false	true	"" → 0, false → 0
Quy tắc: Nên dùng === vì không ép kiểu, tránh lỗi logic khó tìm.

Câu A4 (5đ) — Truthy & Falsy
Tất cả giá trị Falsy (8 giá trị):

Giá trị	Loại
false	Boolean
0	Number
-0	Number
0n	BigInt
""	String (rỗng)
null	Null
undefined	Undefined
NaN	Number
Dự đoán kết quả:

Code	Kết quả	Giải thích
if ("0")	✅ In	Chuỗi "0" là truthy (chỉ chuỗi rỗng mới falsy)
if ("")	❌ Không in	Chuỗi rỗng là falsy
if ([])	✅ In	Mảng rỗng là truthy
if ({})	✅ In	Object rỗng là truthy
if (null)	❌ Không in	null là falsy
if (0)	❌ Không in	0 là falsy
if (-1)	✅ In	-1 là truthy (khác 0)
if (" ")	✅ In	Khoảng trắng là truthy (không phải chuỗi rỗng)
Câu A5 (5đ) — Template Literals
Viết lại bằng template literal:

javascript
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
PHẦN C — SUY LUẬN (20 điểm)
Câu C1 (10đ) — Debug JavaScript
Phát hiện 7 lỗi trong code:

STT	Lỗi	Dòng	Giải thích	Cách sửa
1	Thiếu xử lý kiểu dữ liệu	const gia = tinhGiaGiamGia("100000", 20)	Truyền string "100000" nhưng tính như number	giaBan = Number(giaBan)
2	Không kiểm tra NaN	Trong hàm	Input không phải số sẽ ra NaN	if (isNaN(giaBan))
3	Dùng = thay ===	if (giaSauGiam = 0)	Đây là phép gán, không phải so sánh	if (giaSauGiam === 0)
4	Thiếu dấu ;	Nhiều dòng	Thiếu dấu chấm phẩy cuối câu lệnh	Thêm ; ở cuối mỗi câu lệnh
5	Không return khi lỗi	if (phanTramGiam...)	Không return, hàm vẫn chạy tiếp	Thêm return sau khi thông báo lỗi
6	Thiếu kiểm tra giá trị âm	Trong hàm	Giá bán âm vẫn tính toán	if (giaBan < 0) return "Lỗi"
7	Lỗi ẩn: var trong vòng lặp	for (var i = 0; i < 5; i++)	var không có block scope, callback luôn in 5	Dùng let thay var
Code đã sửa hoàn chỉnh:

javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Ép kiểu sang number
    giaBan = Number(giaBan);
    phanTramGiam = Number(phanTramGiam);
    
    // Kiểm tra số hợp lệ
    if (isNaN(giaBan) || isNaN(phanTramGiam)) {
        return "Lỗi: Giá bán hoặc phần trăm không hợp lệ";
    }
    
    if (giaBan < 0) {
        return "Lỗi: Giá bán không hợp lệ";
    }
    
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Lỗi: Phần trăm giảm không hợp lệ";
    }
    
    var giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;
    
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia("100000", 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

// Sửa lỗi closure - dùng let thay var
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
Giải thích lỗi ẩn với var trong vòng lặp:

javascript
// SAI: Dùng var
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);  // Luôn in "Item 5"
    }, 1000);
}
// Kết quả: Item 5 (in 5 lần)

// ĐÚNG: Dùng let
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);  // In 0,1,2,3,4
    }, 1000);
}
// Kết quả: Item 0, Item 1, Item 2, Item 3, Item 4
Lý do: var không có block scope, chỉ có function scope. Sau khi vòng lặp kết thúc, i = 5. Khi setTimeout chạy sau 1 giây, nó lấy giá trị i hiện tại là 5. let tạo một binding mới cho mỗi lần lặp, nên mỗi callback nhận đúng giá trị i của lần lặp đó.

