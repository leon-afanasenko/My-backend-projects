function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  const total = price * quantity;
  return total - (total * discount) / 100;
}

console.log(calculateTotal(100, 2, 10));
console.log(calculateTotal(50, 4));

type IdType = string | number;

function displayId(id: IdType): void {
  if (typeof id === "string") {
    console.log(`ID: ${id.toUpperCase()}`);
  } else if (typeof id === "number") {
    console.log(`ID: ${id * 10}`);
  }
}

displayId("order123");
displayId(42);

type Order = {
  orderId: string;
  amount: number;
  status: "pending" | "shipped" | "delivered";
};

const orders: Order[] = [
  { orderId: "001", amount: 150, status: "pending" },
  { orderId: "002", amount: 200, status: "shipped" },
  { orderId: "003", amount: 300, status: "delivered" },
  { orderId: "004", amount: 100, status: "pending" },
];

function filterOrdersByStatus(
  orders: Order[],
  status: "pending" | "shipped" | "delivered"
): Order[] {
  return orders.filter((order) => order.status === status);
}

console.log(filterOrdersByStatus(orders, "pending"));

type ProductInfo = [string, number, number];
type Inventory = { [key: string]: number };

function updateStock(
  inventory: Inventory,
  productInfo: ProductInfo
): Inventory {
  const [productName, , quantity] = productInfo;
  inventory[productName] = (inventory[productName] || 0) + quantity;
  return inventory;
}

const inventory: Inventory = {
  Laptop: 10,
  Mouse: 25,
};

const productInfo: ProductInfo = ["Laptop", 1500, 5];
console.log(updateStock(inventory, productInfo));

// npx ts-node index.ts

/*let username: string = "Alice";

let a: number = 5;
let b: string = "10";

let c: number = a + Number(b);

console.log(c);*/

/*// Переменная типа string
let str: string = "Hello, TypeScript!";

// Переменная типа number
let num: number = 42;

// Переменная типа boolean
let isBoolean: boolean = true;

// Переменная типа null
let empty: null = null;

// Переменная типа undefined
let notDefined: undefined = undefined;

let variable: any = "This is a string";
console.log(variable); // "This is a string"

variable = 123; // Изменяем значение на число
console.log(variable); // 123

// Функция для строки
function describeDataType(value: string): string {
  return `This is a string with value: "${value}"`;
}

// Функция для числа
function describeNumber(value: number): string {
  return `This is a number with value: ${value}`;
}

// Функция для boolean
function describeBoolean(value: boolean): string {
  return `This is a boolean with value: ${value}`;
}

// Пример использования:
console.log(describeDataType("Hello"));
console.log(describeNumber(42));
console.log(describeBoolean(true));*/
