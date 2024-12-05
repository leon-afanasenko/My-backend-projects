// node dist/homework18.js
// npx tsc

type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: "Leon",
  permissions: ["read", "write", "delete"],
  email: "leon@example.com",
};

console.log(adminUser);

type Engine = {
  type: string;
  horsepower: number;
};

type Car = {
  make: string;
  model: string;
  engine: Engine;
  year?: number;
};

const myCar: Car = {
  make: "Tesla",
  model: "Model S",
  engine: {
    type: "Electric",
    horsepower: 1020,
  },
  year: 2023,
};

function printCarInfo(car: Car): void {
  console.log(`Make: ${car.make}, Model: ${car.model}`);
  console.log(
    `Engine: ${car.engine.type}, Horsepower: ${car.engine.horsepower}`
  );
  if (car.year) {
    console.log(`Year: ${car.year}`);
  } else {
    console.log("Year: not specified");
  }
}

printCarInfo(myCar);

interface Product {
  name: string;
  price: number;
}

interface CalculateDiscount {
  (product: Product, discount: number): number;
}

const calculateDiscount: CalculateDiscount = (product, discount) => {
  return product.price - product.price * (discount / 100);
};

const product: Product = {
  name: "Laptop",
  price: 1000,
};

console.log(`New price: ${calculateDiscount(product, 15)}`);

interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { name: "Alice", salary: 5000 },
  { name: "Bob", salary: 6000 },
  { name: "Charlie", salary: 7000 },
];

function getSalaries(employees: Employee[]): number[] {
  return employees.map((employee) => employee.salary);
}

console.log(getSalaries(employees));
interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  firstName: "John",
  lastName: "Doe",
  grade: 95,
};

function printStudentInfo(student: Student): void {
  console.log(
    `Student: ${student.firstName} ${student.lastName}, Grade: ${student.grade}`
  );
}

printStudentInfo(student);

interface ConcatStrings {
  (str1: string, str2: string): string;
}

const concatStrings: ConcatStrings = (str1, str2) => {
  return str1 + str2;
};

console.log(concatStrings("Hello, ", "world!"));
