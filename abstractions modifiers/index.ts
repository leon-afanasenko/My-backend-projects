//  npx ts-node index.ts

abstract class Animal {
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow");
  }
}

const animals: Animal[] = [new Dog(), new Cat()];

animals.forEach((animal) => animal.makeSound());
//////////////////////////////////////////////////
abstract class Shape {
  abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
  constructor(public color: string) {
    super();
  }
}

class ColoredCircle extends ColoredShape {
  constructor(color: string, private radius: number) {
    super(color);
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class ColoredRectangle extends ColoredShape {
  constructor(color: string, private width: number, private height: number) {
    super(color);
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

const shapes: ColoredShape[] = [
  new ColoredCircle("Red", 5),
  new ColoredRectangle("Blue", 10, 20),
];

shapes.forEach((shape) => {
  console.log(`Color: ${shape.color}, Area: ${shape.calculateArea()}`);
});

///////////////////////////////////
abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log("Washing machine is now ON.");
  }

  turnOff(): void {
    console.log("Washing machine is now OFF.");
  }
}

class Refrigerator extends Appliance {
  turnOn(): void {
    console.log("Refrigerator is now ON.");
  }

  turnOff(): void {
    console.log("Refrigerator is now OFF.");
  }
}

const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()];

appliances.forEach((appliance) => {
  appliance.turnOn();
  appliance.turnOff();
});

////////////////////////////////////////////////////////////
abstract class Account {
  protected balance: number = 0;

  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;

  getBalance(): number {
    return this.balance;
  }
}

class SavingsAccount extends Account {
  private interestRate: number = 0.05;

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.log("Insufficient funds.");
    }
  }

  addInterest(): void {
    this.balance += this.balance * this.interestRate;
  }
}

class CheckingAccount extends Account {
  private transactionFee: number = 1.5;

  deposit(amount: number): void {
    this.balance += amount;
    this.balance -= this.transactionFee;
  }

  withdraw(amount: number): void {
    if (amount + this.transactionFee <= this.balance) {
      this.balance -= amount + this.transactionFee;
    } else {
      console.log("Insufficient funds.");
    }
  }
}

const savings = new SavingsAccount();
savings.deposit(1000);
savings.addInterest();
console.log(`Savings Account Balance: ${savings.getBalance()}`);

const checking = new CheckingAccount();
checking.deposit(500);
checking.withdraw(100);
console.log(`Checking Account Balance: ${checking.getBalance()}`);
/////////////////////////////////////////////////////////
abstract class Media {
  abstract play(): void;
}

class AudioMedia extends Media {
  play(): void {
    console.log("Playing audio");
  }
}

class Video extends Media {
  play(): void {
    console.log("Playing video");
  }
}

const mediaArray: Media[] = [new AudioMedia(), new Video()];

mediaArray.forEach((media) => media.play());

/////////////////////////////////

/*abstract class Employee {
  hello(): void {
    console.log("Hello everyone!");
  }

  abstract calculateSalary(): number;
}

class FullTimeEmployee extends Employee {
  constructor() {
    super();
    super.hello();
  }

  calculateSalary(): number {
    return 5000; 
  }
}

class PartTimeEmployee extends Employee {
  public hoursWorked: number;
  public hourlyRate: number;

  constructor(hoursWorked: number, hourlyRate: number) {
    super();
    this.hoursWorked = hoursWorked;
    this.hourlyRate = hourlyRate;
    super.hello();
  }

  calculateSalary(): number {
    return this.hoursWorked * this.hourlyRate; 
  }
}


const fullTime = new FullTimeEmployee();
console.log(fullTime.calculateSalary()); 

const partTime = new PartTimeEmployee(40, 15);
console.log(partTime.calculateSalary()); */
/////////////////////////////////////////////////////////////////

/*abstract class Vehicle {
  abstract move(): void;
}

class Car extends Vehicle {
  move(): void {
    console.log("Машина едет по дороге");
  }
}

class Plane extends Vehicle {
  move(): void {
    console.log("Самолёт летит по воздуху");
  }
}

const vehicles: Vehicle[] = [new Car(), new Plane(), new Car(), new Plane()];

for (const vehicle of vehicles) {
  vehicle.move();
}*/
/////////////////////////////////////////////////////////////

/*abstract class Shape {
  abstract calculateArea(): number;
}

class Triangle extends Shape {
  name: string = "Triangle";
  color: string = "red";
  height: number;
  base: number;

  constructor(height: number, base: number) {
    super();
    this.height = height;
    this.base = base;
  }

  calculateArea(): number {
    return (this.base * this.height) / 2;
  }
}

const triangle = new Triangle(10, 5);
console.log(`Фигура: ${triangle.name}`);
console.log(`Цвет: ${triangle.color}`);
console.log(`Площадь: ${triangle.calculateArea()}`);*/
////////////////////////////////////////////////////////////////
