const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

const results = students.map((student, index) => {
    const avg = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
    let rank;
    if (avg >= 8.0) rank = "Giỏi";
    else if (avg >= 6.5) rank = "Khá";
    else if (avg >= 5.0) rank = "Trung bình";
    else rank = "Yếu";
    
    return {
        stt: index + 1,
        name: student.name,
        avg: avg.toFixed(1),
        rank: rank,
        gender: student.gender,
        math: student.math,
        physics: student.physics,
        cs: student.cs
    };
});

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
results.forEach(s => {
    console.log(`| ${s.stt}    | ${s.name.padEnd(6)} | ${s.avg}  | ${s.rank.padEnd(10)} |`);
});

const rankCount = { Giỏi: 0, Khá: 0, "Trung bình": 0, Yếu: 0 };
results.forEach(s => rankCount[s.rank]++);
console.log("\nThống kê xếp loại:", rankCount);

let highest = results[0], lowest = results[0];
results.forEach(s => {
    if (parseFloat(s.avg) > parseFloat(highest.avg)) highest = s;
    if (parseFloat(s.avg) < parseFloat(lowest.avg)) lowest = s;
});
console.log(`\nĐiểm TB cao nhất: ${highest.name} (${highest.avg})`);
console.log(`Điểm TB thấp nhất: ${lowest.name} (${lowest.avg})`);

let sumMath = 0, sumPhysics = 0, sumCS = 0;
students.forEach(s => {
    sumMath += s.math;
    sumPhysics += s.physics;
    sumCS += s.cs;
});
console.log(`\nĐiểm TB toàn lớp:`);
console.log(`Toán: ${(sumMath / students.length).toFixed(2)}`);
console.log(`Vật lý: ${(sumPhysics / students.length).toFixed(2)}`);
console.log(`CS: ${(sumCS / students.length).toFixed(2)}`);

let maleSum = 0, femaleSum = 0;
let maleCount = 0, femaleCount = 0;
results.forEach(s => {
    if (s.gender === "M") {
        maleSum += parseFloat(s.avg);
        maleCount++;
    } else {
        femaleSum += parseFloat(s.avg);
        femaleCount++;
    }
});
console.log(`\nĐiểm TB theo giới tính:`);
console.log(`Nam: ${(maleSum / maleCount).toFixed(2)}`);
console.log(`Nữ: ${(femaleSum / femaleCount).toFixed(2)}`);