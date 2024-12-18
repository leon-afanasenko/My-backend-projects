var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function delayPromise1() {
    return new Promise((resolve) => setTimeout(() => resolve("Result 1"), 1000));
}
function delayPromise2() {
    return new Promise((resolve) => setTimeout(() => resolve("Result 2"), 1500));
}
function delayPromise3() {
    return new Promise((resolve) => setTimeout(() => resolve("Result 3"), 500));
}
function sequentialPromises() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result1 = yield delayPromise1();
            console.log(result1);
            const result2 = yield delayPromise2();
            console.log(result2);
            const result3 = yield delayPromise3();
            console.log(result3);
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
sequentialPromises();
function processString(str) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(str.toUpperCase()), Math.random() * 1000);
    });
}
function processArrayParallel(strings) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield Promise.all(strings.map(processString));
            console.log(results);
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
const stringsArray = ["hello", "world", "async", "await"];
processArrayParallel(stringsArray);
function successPromise1() {
    return new Promise((resolve) => setTimeout(() => resolve("Success 1"), 500));
}
function successPromise2() {
    return new Promise((resolve) => setTimeout(() => resolve("Success 2"), 1000));
}
function failedPromise() {
    return new Promise((_, reject) => setTimeout(() => reject("Intentional Error"), 700));
}
function handleParallelPromises() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield Promise.all([
                successPromise1(),
                successPromise2(),
                failedPromise(),
            ]);
            console.log(results);
        }
        catch (error) {
            console.error("Error occurred:", error);
        }
    });
}
handleParallelPromises();
function createPromiseWithDelay(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(`Finished in ${ms}ms`), ms));
}
function handleDynamicPromises(numbers) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const promises = numbers.map(createPromiseWithDelay);
            const results = yield Promise.all(promises);
            console.log(results);
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
const numbersArray = [1000, 500, 2000, 1500];
handleDynamicPromises(numbersArray);
/*function fetchData(id: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve(`Данные для ID: ${id}`);
      } else {
        reject(`Ошибка: Данные для ID: ${id} не найдены`);
      }
    }, 1000);
  });
}

function processData(data: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Обработанные данные: ${data}`);
    }, 1000);
  });
}

function saveData(data: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Данные сохранены: ${data}`);
    }, 1000);
  });
}

async function handleDataFlow() {
  try {
    console.log("Начало работы...");

    const fetchedData = await fetchData(1);
    console.log(fetchedData);

    const processedData = await processData(fetchedData);
    console.log(processedData);

    const savedData = await saveData(processedData);
    console.log(savedData);

    console.log("Все операции завершены.");
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

handleDataFlow();*/
