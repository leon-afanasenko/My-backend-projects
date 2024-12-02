// 1
function greetUser(name: string): void {
  console.log(`Привет, ${name}!`);
}

// 2
interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log(
    `Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`
  );
}

// 3
function squareNumber(num: number): number {
  return num * num;
}

// 4
function isEven(num: number): boolean {
  return num % 2 === 0;
}

// 5
interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log(`Студент: ${student.name}, Оценка: ${student.grade}`);
}

// 6
function logMessage(message: string): void {
  console.log(message);
}

// check function

greetUser("Леон");

const person: Person = {
  name: "Алиса",
  age: 25,
  city: "Токио",
};
printPersonInfo(person);

console.log(squareNumber(5));

console.log(isEven(4));
console.log(isEven(7));

const student: Student = {
  name: "Иван",
  grade: 90,
};
printStudentInfo(student);

logMessage("Домашняя работа выполнена!");
