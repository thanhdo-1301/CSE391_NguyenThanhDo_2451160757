const menu = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

const today = new Date();
const isWednesday = today.getDay() === 3;

let subtotal = 0;
menu.forEach(item => {
    subtotal += item.price * item.quantity;
});

let discountPercent = 0;
if (subtotal > 1000000) {
    discountPercent = 15;
} else if (subtotal > 500000) {
    discountPercent = 10;
}

let discount = subtotal * discountPercent / 100;

let extraDiscount = 0;
if (isWednesday) {
    extraDiscount = (subtotal - discount) * 5 / 100;
}

const totalAfterDiscount = subtotal - discount - extraDiscount;

const vat = totalAfterDiscount * 8 / 100;

const tipPercent = 5;
const tip = totalAfterDiscount * tipPercent / 100;

const finalTotal = totalAfterDiscount + vat + tip;

console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG             ║");
console.log("╠══════════════════════════════════════╣");

menu.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    const priceDisplay = (item.price / 1000).toFixed(0) + "k";
    const totalDisplay = (itemTotal / 1000).toFixed(0) + "k";
    const nameDisplay = item.name.padEnd(10);
    console.log(`║ ${index + 1}. ${nameDisplay} x${item.quantity}    @${priceDisplay.padStart(4)}  = ${totalDisplay.padStart(5)}   ║`);
});

console.log("╠══════════════════════════════════════╣");
console.log(`║ Tổng cộng:              ${subtotal.toLocaleString('vi-VN')}đ    ║`);

if (discountPercent > 0) {
    console.log(`║ Giảm giá (${discountPercent}%):            ${Math.floor(discount).toLocaleString('vi-VN')}đ     ║`);
} else {
    console.log(`║ Giảm giá (0%):              0đ     ║`);
}

if (extraDiscount > 0) {
    console.log(`║ Giảm thứ 3 (5%):            ${Math.floor(extraDiscount).toLocaleString('vi-VN')}đ     ║`);
}

console.log(`║ VAT (8%):                ${Math.floor(vat).toLocaleString('vi-VN')}đ     ║`);
console.log(`║ Tip (${tipPercent}%):                 ${Math.floor(tip).toLocaleString('vi-VN')}đ     ║`);
console.log("╠══════════════════════════════════════╣");
console.log(`║ THANH TOÁN:              ${Math.ceil(finalTotal).toLocaleString('vi-VN')}đ   ║`);
console.log("╚══════════════════════════════════════╝");

console.log("\n📋 CHI TIẾT TÍNH TOÁN:");
console.log(`Ngày: ${today.toLocaleDateString('vi-VN')} ${isWednesday ? "(Thứ 3 - được giảm thêm 5%)" : ""}`);
console.log(`Tạm tính: ${subtotal.toLocaleString('vi-VN')}đ`);
console.log(`Giảm giá: ${discountPercent}% = ${Math.floor(discount).toLocaleString('vi-VN')}đ`);
if (extraDiscount > 0) console.log(`Giảm thêm thứ 3: 5% = ${Math.floor(extraDiscount).toLocaleString('vi-VN')}đ`);
console.log(`VAT: 8% = ${Math.floor(vat).toLocaleString('vi-VN')}đ`);
console.log(`Tip: ${tipPercent}% = ${Math.floor(tip).toLocaleString('vi-VN')}đ`);
console.log(`Tổng thanh toán: ${Math.ceil(finalTotal).toLocaleString('vi-VN')}đ`);