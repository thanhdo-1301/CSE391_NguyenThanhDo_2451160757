let secretNumber;
let attempts;
let maxAttempts = 7;
let guessedNumbers = [];

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessedNumbers = [];
    playGame();
}

function playGame() {
    while (attempts < maxAttempts) {
        let guess = prompt(`🔢 Nhập số (1-100)\nLượt đoán: ${attempts + 1}/${maxAttempts}\nĐã đoán: ${guessedNumbers.join(", ") || "chưa có"}`);
        
        if (guess === null) {
            alert("❌ Bạn đã thoát game!");
            return;
        }
        
        let number = parseInt(guess);
        if (isNaN(number) || number < 1 || number > 100) {
            alert("⚠️ Vui lòng nhập số từ 1 đến 100!");
            continue;
        }
        
        if (guessedNumbers.includes(number)) {
            alert(`⚠️ Bạn đã đoán số ${number} rồi! Hãy thử số khác.`);
            continue;
        }
        
        guessedNumbers.push(number);
        attempts++;
        
        if (number === secretNumber) {
            alert(`🎉 CHÚC MỪNG! Bạn đoán đúng số ${secretNumber} sau ${attempts} lần! 🎉`);
            if (confirm("Bạn muốn chơi tiếp không?")) {
                startGame();
            }
            return;
        } else if (number < secretNumber) {
            alert(`📈 ${number} là THẤP HƠN số bí mật! Còn ${maxAttempts - attempts} lượt.`);
        } else {
            alert(`📉 ${number} là CAO HƠN số bí mật! Còn ${maxAttempts - attempts} lượt.`);
        }
    }
    
    alert(`😭 HẾT LƯỢT! Số bí mật là ${secretNumber}. Bạn đã thua!`);
    if (confirm("Bạn muốn chơi lại không?")) {
        startGame();
    }
}