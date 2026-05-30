// File: fizzbuzz.js
// Bài B4 - FizzBuzz nâng cao

console.log("=== VERSION 1: CLASSIC FIZZBUZZ ===");
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

console.log("\n=== VERSION 2: CUSTOM FIZZBUZZ ===");
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        for (let rule of rules) {
            if (i % rule.divisor === 0) {
                output += rule.word;
            }
        }
        console.log(output || i);
    }
}

console.log("Test với rules [3:Fizz, 5:Buzz, 7:Jazz] (1-30):");
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);

console.log("\nTest với rules [2:Even, 4:Quad, 8:Octo] (1-20):");
customFizzBuzz(20, [
    { divisor: 2, word: "Even" },
    { divisor: 4, word: "Quad" },
    { divisor: 8, word: "Octo" }
]);