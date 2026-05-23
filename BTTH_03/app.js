/* ================================================
   GIAI ĐOẠN 3 → 7 — JAVASCRIPT
   File: js/app.js

   CẤU TRÚC FILE:
   1. LẤY CÁC PHẦN TỬ DOM (querySelector)
   2. MẢNG DỮ LIỆU SINH VIÊN
   3. HÀM RENDER BẢNG (renderStudents)
   4. HÀM THỐNG KÊ (updateStatistics)
   5. HÀM THÔNG BÁO (showNotification)
   6. HÀM MỞ/ĐÓNG MODAL
   7. HÀM XỬ LÝ FORM (thêm & sửa)
   8. HÀM XÓA SINH VIÊN
   9. HÀM localStorage (lưu & đọc)
   10. VALIDATION (kiểm tra dữ liệu)
   11. GẮN SỰ KIỆN (addEventListener)
   12. KHỞI ĐỘNG ỨNG DỤNG
================================================ */


/* ================================================
   PHẦN 1: LẤY CÁC PHẦN TỬ DOM

   Giải thích:
   - querySelector('#id') → tìm phần tử có id đó trong HTML
   - Kết quả là một "DOM element" — đối tượng đại diện cho thẻ HTML
   - Chúng ta LƯU vào biến để dùng đi dùng lại nhiều lần
   - Không cần querySelector lại mỗi lần → nhanh hơn, gọn hơn

   Ví dụ thực tế:
   - btnOpenModal = thẻ <button id="btnOpenModal"> trong HTML
   - studentTableBody = thẻ <tbody id="studentTableBody"> trong HTML
================================================ */

// Nút "Thêm sinh viên" ở thanh công cụ
const btnOpenModal = document.querySelector('#btnOpenModal');

// Nút X để đóng modal
const btnCloseModal = document.querySelector('#btnCloseModal');

// Nút Hủy trong form
const btnCancel = document.querySelector('#btnCancel');

// Lớp nền tối của modal (phần overlay bên ngoài hộp trắng)
const modalOverlay = document.querySelector('#modalOverlay');

// Tiêu đề của modal (JS sẽ đổi chữ "Thêm" ↔ "Cập nhật")
const modalTitle = document.querySelector('#modalTitle');

// Nút submit của form (JS sẽ đổi chữ "Lưu" ↔ "Cập nhật")
const btnSubmit = document.querySelector('#btnSubmit');

// Form nhập liệu
const studentForm = document.querySelector('#studentForm');

// Trường ẩn lưu index đang sửa (editIndex)
const editIndexInput = document.querySelector('#editIndex');

// Các ô input của form
const inputStudentId = document.querySelector('#studentId');
const inputFullName  = document.querySelector('#fullName');
const inputBirthDate = document.querySelector('#birthDate');
const inputClassName = document.querySelector('#className');
const inputGpa       = document.querySelector('#gpa');
const inputEmail     = document.querySelector('#email');

// Phần thân bảng (tbody) — JS sẽ render danh sách vào đây
const studentTableBody = document.querySelector('#studentTableBody');

// Khu vực thống kê
const totalStudentsEl = document.querySelector('#totalStudents');
const averageGpaEl    = document.querySelector('#averageGpa');

// Khu vực thông báo
const notificationEl = document.querySelector('#notification');


/* ================================================
   PHẦN 2: MẢNG DỮ LIỆU SINH VIÊN

   Giải thích:
   - "students" là mảng (array) chứa toàn bộ dữ liệu sinh viên
   - Mỗi phần tử trong mảng là một object sinh viên
   - Ví dụ: students[0] = { studentId: 'SV001', fullName: 'Nguyễn Văn A', ... }
   - Mảng này là "nguồn sự thật" — mọi thao tác đều qua mảng này
   - Sau mỗi thao tác (thêm/sửa/xóa): lưu mảng xuống localStorage
================================================ */
let students = [];


/* ================================================
   PHẦN 9: HÀM localStorage

   Giải thích localStorage:
   - localStorage là nơi lưu dữ liệu TRONG TRÌNH DUYỆT
   - Dữ liệu vẫn còn khi reload trang (không mất)
   - localStorage chỉ lưu được CHUỖI (string), không lưu được mảng/object
   - Vì vậy cần:
     + JSON.stringify(mảng) → chuyển mảng thành chuỗi JSON để LƯU
     + JSON.parse(chuỗi)    → chuyển chuỗi JSON thành mảng để ĐỌC

   Ví dụ:
   - students = [{id: 'SV001', name: 'An'}]
   - JSON.stringify(students) = '[{"id":"SV001","name":"An"}]'  ← chuỗi
   - localStorage.setItem('students', chuỗi đó)
   
   Khi đọc lại:
   - chuỗi = localStorage.getItem('students')  → '[{"id":"SV001","name":"An"}]'
   - JSON.parse(chuỗi) = [{id: 'SV001', name: 'An'}]  ← mảng
================================================ */

// Hàm LƯU mảng students xuống localStorage
function saveToLocalStorage() {
  // JSON.stringify: chuyển mảng → chuỗi JSON
  // localStorage.setItem: lưu với key là 'students'
  const chuoiJson = JSON.stringify(students);
  localStorage.setItem('students', chuoiJson);
}

// Hàm ĐỌC dữ liệu từ localStorage vào mảng students
function loadFromLocalStorage() {
  // Lấy chuỗi JSON từ localStorage theo key 'students'
  const chuoiJson = localStorage.getItem('students');

  // Nếu có dữ liệu (chuoiJson !== null):
  // → parse chuỗi → mảng và gán vào biến students
  // Nếu không có (lần đầu dùng): students = [] (mảng rỗng)
  if (chuoiJson !== null) {
    students = JSON.parse(chuoiJson);
  } else {
    students = [];
  }
}


/* ================================================
   PHẦN 3: HÀM RENDER BẢNG

   Giải thích:
   - "render" = vẽ lại bảng từ mảng students
   - Hàm này LUÔN được gọi sau khi thêm/sửa/xóa
   - Cách hoạt động:
     1. Xóa toàn bộ nội dung cũ trong tbody (innerHTML = '')
     2. Nếu mảng rỗng → hiện dòng "Chưa có dữ liệu"
     3. Duyệt qua từng sinh viên trong mảng (forEach)
     4. Tạo chuỗi HTML cho mỗi sinh viên
     5. Thêm vào tbody (innerHTML +=)

   Tại sao dùng innerHTML?
   → innerHTML cho phép ghi HTML trực tiếp vào phần tử
   → Trình duyệt tự parse chuỗi → thêm vào DOM
================================================ */
function renderStudents() {

  // Bước 1: Xóa hết nội dung cũ trong tbody
  // (xóa tất cả <tr> cũ trước khi vẽ lại)
  studentTableBody.innerHTML = '';

  // Bước 2: Nếu không có sinh viên nào → hiện thông báo trống
  if (students.length === 0) {
    studentTableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="7">📭 Chưa có dữ liệu sinh viên. Hãy thêm sinh viên mới!</td>
      </tr>
    `;
    // Kết thúc hàm, không cần làm gì thêm
    return;
  }

  // Bước 3: Duyệt qua từng sinh viên trong mảng
  // forEach: gọi một hàm cho mỗi phần tử
  // "sv" = sinh viên hiện tại, "index" = vị trí trong mảng (0, 1, 2, ...)
  students.forEach(function(sv, index) {

    // Xác định class CSS cho GPA badge (màu theo điểm)
    let gpaClass = '';
    if (sv.gpa >= 3.5) {
      gpaClass = 'gpa-excellent';    // Giỏi → xanh lá
    } else if (sv.gpa >= 3.0) {
      gpaClass = 'gpa-good';         // Khá → xanh dương
    } else if (sv.gpa >= 2.0) {
      gpaClass = 'gpa-average';      // Trung bình → vàng
    } else {
      gpaClass = 'gpa-poor';         // Yếu → đỏ
    }

    // Tạo chuỗi HTML cho 1 dòng trong bảng
    // Template literal (dấu backtick `) cho phép viết HTML nhiều dòng
    // ${sv.fullName} → chèn giá trị biến vào chuỗi
    const dongHTML = `
      <tr>
        <td>${sv.studentId}</td>
        <td>${sv.fullName}</td>
        <td>${sv.birthDate}</td>
        <td>${sv.className}</td>
        <td>
          <span class="gpa-badge ${gpaClass}">${sv.gpa}</span>
        </td>
        <td>${sv.email}</td>
        <td>
          <!-- Nút Sửa: data-index="${index}" lưu vị trí trong mảng -->
          <!-- Khi click vào nút Sửa, JS đọc data-index để biết sửa sinh viên nào -->
          <button class="btn-edit" data-index="${index}">✏️ Sửa</button>
          
          <!-- Nút Xóa: tương tự, dùng data-index để biết xóa sinh viên nào -->
          <button class="btn-delete" data-index="${index}">🗑️ Xóa</button>
        </td>
      </tr>
    `;

    // Thêm dòng HTML vào tbody
    // += nghĩa là thêm vào cuối (không xóa cái cũ)
    studentTableBody.innerHTML += dongHTML;
  });

  // Bước 4: Gắn sự kiện cho các nút Sửa và Xóa vừa được tạo
  // (Phải gắn SAU KHI render vì các nút này vừa được tạo mới)
  ganSuKienChoNutSuaXoa();
}


/* ================================================
   PHẦN 4: HÀM THỐNG KÊ

   Giải thích:
   - Tính tổng số sinh viên (= độ dài mảng)
   - Tính GPA trung bình (= tổng GPA / số sinh viên)
   - textContent = thay đổi nội dung văn bản của phần tử
================================================ */
function updateStatistics() {

  // Tổng số sinh viên = số phần tử trong mảng
  const tongSinhVien = students.length;
  totalStudentsEl.textContent = tongSinhVien;

  // GPA trung bình
  if (tongSinhVien === 0) {
    // Không có sinh viên → hiện 0.00
    averageGpaEl.textContent = '0.00';
  } else {
    // Tính tổng GPA của tất cả sinh viên
    // reduce: duyệt mảng và cộng dồn
    // tongGpa ban đầu = 0, mỗi vòng cộng thêm sv.gpa
    let tongGpa = 0;
    students.forEach(function(sv) {
      // parseFloat: chuyển chuỗi "3.5" → số 3.5
      tongGpa = tongGpa + parseFloat(sv.gpa);
    });

    // Chia trung bình
    const trungBinhGpa = tongGpa / tongSinhVien;

    // toFixed(2): làm tròn 2 chữ số thập phân → "3.50"
    averageGpaEl.textContent = trungBinhGpa.toFixed(2);
  }
}


/* ================================================
   PHẦN 5: HÀM THÔNG BÁO

   Giải thích:
   - Hiện thông báo ở góc phải màn hình
   - "loai" = 'success' (xanh) hoặc 'error' (đỏ)
   - Sau 3 giây → tự động ẩn đi
================================================ */
function showNotification(noiDung, loai) {
  // Ghi nội dung thông báo
  notificationEl.textContent = noiDung;

  // Xóa class loại cũ (success/error) rồi thêm loại mới
  notificationEl.classList.remove('success', 'error', 'hidden');
  notificationEl.classList.add(loai);

  // Sau 3000ms (3 giây) → ẩn thông báo đi
  setTimeout(function() {
    notificationEl.classList.add('hidden');
  }, 3000);
}


/* ================================================
   PHẦN 6: HÀM MỞ/ĐÓNG MODAL

   Giải thích:
   - Mở modal: xóa class 'hidden' → CSS bỏ display:none → modal hiện
   - Đóng modal: thêm class 'hidden' → CSS thêm display:none → modal ẩn
================================================ */

// Hàm mở modal (dùng khi bấm "Thêm sinh viên")
function openModal() {
  // Xóa class 'hidden' → modal không bị display:none nữa → hiện ra
  modalOverlay.classList.remove('hidden');
}

// Hàm đóng modal
function closeModal() {
  // Thêm class 'hidden' → modal bị display:none → ẩn đi
  modalOverlay.classList.add('hidden');

  // Đặt lại form về trạng thái "Thêm mới" (xóa dấu vết của lần sửa trước)
  resetForm();
}

// Hàm đặt lại form về trạng thái ban đầu (thêm mới)
function resetForm() {
  // Xóa toàn bộ dữ liệu trong form
  studentForm.reset();

  // Xóa editIndex (không đang sửa ai cả)
  editIndexInput.value = '';

  // Đổi tiêu đề modal về "Thêm sinh viên mới"
  modalTitle.textContent = 'Thêm sinh viên mới';

  // Đổi chữ nút submit về "Lưu sinh viên"
  btnSubmit.textContent = 'Lưu sinh viên';
}


/* ================================================
   PHẦN 10: VALIDATION — KIỂM TRA DỮ LIỆU

   Giải thích:
   - Validation = kiểm tra dữ liệu trước khi lưu
   - Nếu không hợp lệ → return false → chặn submit
   - Nếu hợp lệ → return true → cho phép submit

   Kiểm tra:
   1. Các trường bắt buộc không được rỗng
   2. Email đúng định dạng (có @ và .)
   3. GPA từ 0.0 đến 4.0
================================================ */
function validateForm(sv) {
  // Kiểm tra các trường bắt buộc không được rỗng
  // .trim() xóa khoảng trắng đầu/cuối
  if (sv.studentId.trim() === '') {
    showNotification('❌ Vui lòng nhập mã sinh viên!', 'error');
    return false;
  }

  if (sv.fullName.trim() === '') {
    showNotification('❌ Vui lòng nhập họ và tên!', 'error');
    return false;
  }

  if (sv.birthDate === '') {
    showNotification('❌ Vui lòng chọn ngày sinh!', 'error');
    return false;
  }

  if (sv.className.trim() === '') {
    showNotification('❌ Vui lòng nhập lớp học!', 'error');
    return false;
  }

  // Kiểm tra GPA: phải là số từ 0 đến 4
  const gpaNumber = parseFloat(sv.gpa);
  if (isNaN(gpaNumber) || gpaNumber < 0 || gpaNumber > 4) {
    showNotification('❌ GPA phải là số từ 0.0 đến 4.0!', 'error');
    return false;
  }

  // Kiểm tra email: phải có @ và dấu chấm sau @
  // indexOf('@') → vị trí của ký tự @ (-1 nếu không có)
  const coKyTuAt = sv.email.indexOf('@') !== -1;
  const coDauCham = sv.email.indexOf('.') !== -1;
  if (sv.email.trim() === '' || !coKyTuAt || !coDauCham) {
    showNotification('❌ Email không đúng định dạng!', 'error');
    return false;
  }

  // Tất cả kiểm tra đều qua → dữ liệu hợp lệ
  return true;
}


/* ================================================
   PHẦN 7: XỬ LÝ FORM (THÊM & SỬA)

   Giải thích:
   - Một form dùng chung cho cả Thêm và Sửa
   - Phân biệt nhờ editIndex:
     + editIndex = '' (rỗng) → đang THÊM mới
     + editIndex = '0', '1', ... → đang SỬA sinh viên tại vị trí đó

   Flow Thêm:
   1. Lấy dữ liệu từ các ô input
   2. Tạo object sinh viên
   3. push() vào mảng → thêm vào cuối
   4. Lưu localStorage
   5. Render lại bảng
   6. Cập nhật thống kê
   7. Đóng modal
   8. Hiện thông báo thành công

   Flow Sửa:
   1. Lấy dữ liệu từ các ô input
   2. Tạo object sinh viên
   3. Thay thế students[index] = object mới
   4. Lưu localStorage
   5. Render lại bảng
   6. Cập nhật thống kê
   7. Đóng modal
   8. Hiện thông báo thành công
================================================ */
function xuLySubmitForm(event) {
  // preventDefault(): ngăn browser reload trang khi submit form
  // Mặc định khi submit form, browser sẽ reload → mất hết dữ liệu!
  // preventDefault() chặn hành động đó lại
  event.preventDefault();

  // Lấy dữ liệu từ các ô input
  // .value: lấy giá trị hiện tại của ô input
  // .trim(): xóa khoảng trắng thừa đầu/cuối
  const svMoi = {
    studentId: inputStudentId.value.trim(),
    fullName:  inputFullName.value.trim(),
    birthDate: inputBirthDate.value,
    className: inputClassName.value.trim(),
    gpa:       inputGpa.value,
    email:     inputEmail.value.trim()
  };

  // Kiểm tra dữ liệu hợp lệ không
  // Nếu không hợp lệ → validateForm trả về false → return → dừng hàm
  const hopLe = validateForm(svMoi);
  if (hopLe === false) {
    return;   // Dừng lại, không làm gì thêm
  }

  // Lấy giá trị editIndex để biết đang thêm hay sửa
  const editIndexValue = editIndexInput.value;

  // Nếu editIndex RỖNG → đang THÊM MỚI
  if (editIndexValue === '') {

    // push(): thêm phần tử mới vào CUỐI mảng
    students.push(svMoi);

    showNotification('✅ Thêm sinh viên thành công!', 'success');

  } else {
    // Nếu editIndex CÓ GIÁ TRỊ → đang SỬA
    // parseInt: chuyển chuỗi '0', '1', '2' → số nguyên 0, 1, 2
    const index = parseInt(editIndexValue);

    // Thay thế sinh viên tại vị trí index bằng object mới
    students[index] = svMoi;

    showNotification('✅ Cập nhật sinh viên thành công!', 'success');
  }

  // Sau khi thêm hoặc sửa xong:
  saveToLocalStorage();   // Lưu xuống localStorage
  renderStudents();       // Vẽ lại bảng
  updateStatistics();     // Cập nhật thống kê
  closeModal();           // Đóng popup
}


/* ================================================
   PHẦN 8: HÀM XÓA SINH VIÊN

   Flow:
   1. Hiện confirm dialog hỏi người dùng
   2. Nếu đồng ý (confirm = true):
      → splice(): xóa 1 phần tử tại vị trí index khỏi mảng
      → Lưu localStorage
      → Render lại bảng
      → Cập nhật thống kê
      → Hiện thông báo

   splice(index, 1):
   - Tham số 1: vị trí bắt đầu xóa
   - Tham số 2: số lượng phần tử xóa (1 = xóa 1 phần tử)
================================================ */
function xoaSinhVien(index) {
  // Hiện hộp xác nhận (confirm dialog)
  // confirm() trả về true nếu bấm OK, false nếu bấm Hủy
  const xacNhan = confirm('⚠️ Bạn có chắc muốn xóa sinh viên này không?');

  if (xacNhan === true) {
    // splice(vị_trí, số_lượng_xóa)
    // Xóa 1 phần tử tại vị trí index
    students.splice(index, 1);

    saveToLocalStorage();
    renderStudents();
    updateStatistics();

    showNotification('✅ Đã xóa sinh viên thành công!', 'success');
  }
  // Nếu bấm Hủy → xacNhan = false → không làm gì cả
}


/* ================================================
   HÀM MỞ FORM SỬA SINH VIÊN

   Flow:
   1. Lấy object sinh viên tại vị trí index
   2. Điền dữ liệu vào các ô input của form
   3. Lưu index vào editIndex (để biết đang sửa ai)
   4. Đổi tiêu đề modal → "Cập nhật sinh viên"
   5. Mở modal
================================================ */
function moFormSua(index) {
  // Lấy dữ liệu sinh viên tại vị trí index
  const sv = students[index];

  // Điền dữ liệu vào từng ô input
  // .value = "abc" → ghi giá trị vào ô input
  inputStudentId.value = sv.studentId;
  inputFullName.value  = sv.fullName;
  inputBirthDate.value = sv.birthDate;
  inputClassName.value = sv.className;
  inputGpa.value       = sv.gpa;
  inputEmail.value     = sv.email;

  // Lưu index vào input ẩn (để khi submit biết đang sửa sinh viên nào)
  editIndexInput.value = index;

  // Đổi tiêu đề và chữ nút submit
  modalTitle.textContent  = '✏️ Cập nhật sinh viên';
  btnSubmit.textContent   = 'Cập nhật';

  // Mở modal
  openModal();
}


/* ================================================
   PHẦN: GẮN SỰ KIỆN CHO NÚT SỬA VÀ XÓA TRONG BẢNG

   Vấn đề:
   - Các nút Sửa và Xóa được TẠO MỚI mỗi lần render
   - Không thể gắn sự kiện từ đầu vì lúc đó chúng chưa tồn tại
   - Phải gắn sự kiện SAU KHI render xong

   Cách đọc data-index:
   - Mỗi nút có thuộc tính data-index="${index}" trong HTML
   - event.target → phần tử vừa được click
   - event.target.dataset.index → lấy giá trị data-index
================================================ */
function ganSuKienChoNutSuaXoa() {

  // Lấy tất cả nút Sửa (querySelectorAll trả về danh sách)
  const tatCaNutSua = document.querySelectorAll('.btn-edit');

  // Duyệt qua từng nút Sửa và gắn sự kiện click
  tatCaNutSua.forEach(function(nut) {
    nut.addEventListener('click', function(event) {
      // Đọc index từ thuộc tính data-index
      // dataset.index → lấy giá trị của data-index (dạng chuỗi)
      const index = parseInt(event.target.dataset.index);
      moFormSua(index);
    });
  });

  // Lấy tất cả nút Xóa
  const tatCaNutXoa = document.querySelectorAll('.btn-delete');

  tatCaNutXoa.forEach(function(nut) {
    nut.addEventListener('click', function(event) {
      const index = parseInt(event.target.dataset.index);
      xoaSinhVien(index);
    });
  });
}


/* ================================================
   PHẦN 11: GẮN SỰ KIỆN (addEventListener)

   Giải thích addEventListener:
   - Cú pháp: phần_tử.addEventListener('tên_sự_kiện', hàm_xử_lý)
   - 'click'  = người dùng bấm chuột
   - 'submit' = người dùng submit form (bấm nút type="submit")
   - Khi sự kiện xảy ra → trình duyệt gọi hàm_xử_lý
================================================ */

// SỰ KIỆN 1: Bấm nút "Thêm sinh viên" → mở modal
btnOpenModal.addEventListener('click', function() {
  openModal();
});

// SỰ KIỆN 2: Bấm nút X → đóng modal
btnCloseModal.addEventListener('click', function() {
  closeModal();
});

// SỰ KIỆN 3: Bấm nút Hủy → đóng modal
btnCancel.addEventListener('click', function() {
  closeModal();
});

// SỰ KIỆN 4: Click vào lớp nền tối (ngoài hộp trắng) → đóng modal
// Khi click vào overlay (không phải vào modal-box bên trong)
modalOverlay.addEventListener('click', function(event) {
  // event.target → phần tử vừa được click
  // Chỉ đóng nếu click đúng vào overlay (không phải vào modal-box)
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// SỰ KIỆN 5: Submit form → xử lý thêm hoặc sửa
studentForm.addEventListener('submit', function(event) {
  xuLySubmitForm(event);
});


/* ================================================
   PHẦN 12: KHỞI ĐỘNG ỨNG DỤNG

   Khi trang web load xong:
   1. Đọc dữ liệu từ localStorage
   2. Render bảng
   3. Cập nhật thống kê

   Tại sao cần bước này?
   → Khi người dùng reload trang, dữ liệu trong mảng students = []
   → Phải đọc lại từ localStorage mới có dữ liệu cũ
================================================ */
function khoiDongUngDung() {
  // Bước 1: Đọc dữ liệu từ localStorage → gán vào mảng students
  loadFromLocalStorage();

  // Bước 2: Render bảng với dữ liệu vừa đọc được
  renderStudents();

  // Bước 3: Cập nhật thống kê
  updateStatistics();
}

// Gọi hàm khởi động ngay khi JS được load
khoiDongUngDung();
