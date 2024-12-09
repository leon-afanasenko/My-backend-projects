const sumEvenNumbers = (numbers: number[]): number => {
  return numbers.reduce(
    (sum: number, num: number) => (num % 2 === 0 ? sum + num : sum),
    0
  );
};

console.log(sumEvenNumbers([1, 2, 3, 4, 5]));

interface StringToBooleanFunction {
  (str: string): boolean;
}

const isStringEmpty: StringToBooleanFunction = (str: string) =>
  str.trim().length === 0;

console.log(isStringEmpty(""));
console.log(isStringEmpty("Hello"));

type CompareStrings = (str1: string, str2: string) => boolean;

const areStringsEqual: CompareStrings = (str1: string, str2: string) =>
  str1 === str2;

console.log(areStringsEqual("hello", "hello"));
console.log(areStringsEqual("hello", "world"));

function getLastElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined;
}

console.log(getLastElement([1, 2, 3, 4]));
console.log(getLastElement(["a", "b", "c"]));
console.log(getLastElement([]));

function makeTriple<T>(arg1: T, arg2: T, arg3: T): T[] {
  return [arg1, arg2, arg3];
}

console.log(makeTriple(1, 2, 3));
console.log(makeTriple("a", "b", "c"));
console.log(makeTriple(true, false, true));
