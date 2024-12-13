// ts-node-dev index.ts

class Car {
  make: string;
  year: number;

  constructor(make: string, year: number) {
    this.make = make;
    this.year = year;
  }

  start(): void {
    console.log("The car is starting");
  }
}

class ElectricCar extends Car {
  batteryLevel: number;

  constructor(make: string, year: number, batteryLevel: number) {
    super(make, year);
    this.batteryLevel = batteryLevel;
  }

  start(): void {
    console.log("The electric car is starting");
  }
}

// Задание 2: Класс Product
class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  static createDiscountedProduct(
    name: string,
    price: number,
    discountPercentage: number
  ): Product {
    const discountedPrice = price - (price * discountPercentage) / 100;
    return new Product(name, discountedPrice);
  }
}

// Задание 3: Класс BankAccount
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    } else {
      console.log("Deposit amount must be positive");
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.log("Invalid withdrawal amount");
    }
  }

  getBalance(): number {
    return this.balance;
  }
}

// Задание 4: Классы Employee и Manager
class Employee {
  static employeeCount: number = 0;
  name: string;
  position: string;

  constructor(name: string, position: string) {
    this.name = name;
    this.position = position;
    Employee.employeeCount += 1;
  }
}

class Manager extends Employee {
  department: string;

  constructor(name: string, position: string, department: string) {
    super(name, position);
    this.department = department;
  }
}

// Задание 5: Классы Book и EBook
class Book {
  title: string;
  author: string;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  describe(): void {
    console.log(`Title: ${this.title}, Author: ${this.author}`);
  }
}

class EBook extends Book {
  fileSize: number;

  constructor(title: string, author: string, fileSize: number) {
    super(title, author);
    this.fileSize = fileSize;
  }

  describe(): void {
    console.log(
      `Title: ${this.title}, Author: ${this.author}, File Size: ${this.fileSize}MB`
    );
  }
}

// ТЕСТЫ

// Задание 1: Тест классы Car и ElectricCar
const car = new Car("Toyota", 2020);
car.start();

const electricCar = new ElectricCar("Tesla", 2023, 85);
electricCar.start();

// Задание 2: Тест класс Product
const discountedProduct = Product.createDiscountedProduct("Laptop", 1000, 20);
console.log(discountedProduct);

// Задание 3: Тест класс BankAccount
const account = new BankAccount(500);
account.deposit(200);
account.withdraw(100);
console.log(account.getBalance());

// Задание 4: Тест классы Employee и Manager
const employee1 = new Employee("Alice", "Developer");
const employee2 = new Employee("Bob", "Designer");
console.log(Employee.employeeCount);

const manager = new Manager("Charlie", "Manager", "IT");
console.log(manager.department);

// Задание 5: Тест классы Book и EBook
const book = new Book("1984", "George Orwell");
book.describe();

const ebook = new EBook("Digital Fortress", "Dan Brown", 2.5);
ebook.describe();
