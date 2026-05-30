console.log("========== ĐOẠN 1: var ==========");
console.log(x);
var x = 5;
console.log("Sau khi gán x = 5: " + x);

console.log("\n========== ĐOẠN 2: let ==========");
try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.log("LỖI: " + error.message);
}

console.log("\n========== ĐOẠN 3: const ==========");
try {
    const z = 15;
    console.log("z ban đầu: " + z);
    z = 20;
    console.log(z);
} catch (error) {
    console.log("LỖI: " + error.message);
}

console.log("\n========== ĐOẠN 4: const với mảng ==========");
const arr = [1, 2, 3];
console.log("Mảng ban đầu:", arr);
arr.push(4);
console.log("Sau khi push(4):", arr);

console.log("\n========== ĐOẠN 5: let trong block ==========");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);