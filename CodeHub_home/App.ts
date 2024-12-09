/*function processArray<T, U>(list: T[], callback: (item: T) => U): U[] {
  return list.map(callback);
}

function getStringLengthOrMessage(
  str: string,
  defaultMessage?: string
): string {
  if (str.length === 0 && defaultMessage) {
    console.log(
      `Строка пустая, возвращаем сообщение по умолчанию: "${defaultMessage}"`
    );
    return defaultMessage;
  }
  const result = `String length: ${str.length}`;
  console.log(`Строка не пустая, возвращаем длину строки: "${result}"`);
  return result;
}

function testGetArray<T>(list: T[], typeName: string) {
  const result = getArrayOfAnything<T>(list);
  console.log(`Первый элемент (${typeName}):`, result);
}

function addNumbers(a: number, b: number): number {
  return a + b;
}

const resultat = addNumbers(150, 150);
console.log(`СУММА ЧИСЕЛ: ${resultat}`);

const doubleNumbers = (numbers: number[]): number[] => {
  return processArray(numbers, (num) => num * 2);
};

const result = doubleNumbers([1, 2, 3, 4, 5]);
console.log(result);

///////////////

const falsyValues = [false, 0, NaN, undefined, null, ""];
falsyValues.forEach((value) => {
  console.log(`Значение: ${value}, Логическое: ${Boolean(value)}`);
});

///////////////

console.log(getStringLengthOrMessage("", "Default message"));
console.log(getStringLengthOrMessage("Hello, TypeScript!"));

///////////////

interface IStringToNumberFunction {
  (input: string): number;
}

const getLength: IStringToNumberFunction = (input) => {
  return input.length;
};

const processString = (str: string, fn: IStringToNumberFunction): number => {
  return fn(str);
};

console.log(processString("hello", getLength));

///////////////
// Универсальная функция для возврата первого элемента массива
function getArrayOfAnything<T>(list: T[]): T {
  return list[0];
}

// Тесты для getArrayOfAnything
testGetArray<number>([4, 2, 5, 1, 0], "number");
testGetArray<boolean>([true, true, true, false], "boolean");
testGetArray<{ a: number; b: number }>(
  [
    { a: 4, b: 2 },
    { a: 5, b: 52 },
  ],
  "object"
);*/
