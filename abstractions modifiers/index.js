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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = /** @class */ (function () {
    function Vehicle() {
    }
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.move = function () {
        console.log("Машина едет по дороге");
    };
    return Car;
}(Vehicle));
var Plane = /** @class */ (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plane.prototype.move = function () {
        console.log("Самолёт летит по воздуху");
    };
    return Plane;
}(Vehicle));
var vehicles = [new Car(), new Plane(), new Car(), new Plane()];
for (var _i = 0, vehicles_1 = vehicles; _i < vehicles_1.length; _i++) {
    var vehicle = vehicles_1[_i];
    vehicle.move();
}
