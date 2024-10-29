const prompt = require("prompt-sync")();

const num1 = parseInt(prompt("Введите первое число: "), 10);
const num2 = parseInt(prompt("Введите второе число: "), 10);
const num3 = parseInt(prompt("Введите третье число: "), 10);

const sum = num1 + num2 + num3;

console.log("Сумма трех чисел: " + sum);
