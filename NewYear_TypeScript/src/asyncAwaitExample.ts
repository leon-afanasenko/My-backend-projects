function delayPromise1(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Result 1"), 1000));
}

function delayPromise2(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Result 2"), 1500));
}

function delayPromise3(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Result 3"), 500));
}

async function sequentialPromises(): Promise<void> {
  try {
    const result1 = await delayPromise1();
    console.log(result1);

    const result2 = await delayPromise2();
    console.log(result2);

    const result3 = await delayPromise3();
    console.log(result3);
  } catch (error) {
    console.error("Error:", error);
  }
}

function processString(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(str.toUpperCase()), Math.random() * 1000);
  });
}

async function processArrayParallel(strings: string[]): Promise<void> {
  try {
    const results = await Promise.all(strings.map(processString));
    console.log("Processed Strings:", results);
  } catch (error) {
    console.error("Error:", error);
  }
}

function createPromiseWithDelay(ms: number): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Finished in ${ms}ms`), ms)
  );
}

async function handleDynamicPromises(numbers: number[]): Promise<void> {
  try {
    const promises = numbers.map(createPromiseWithDelay);
    const results = await Promise.all(promises);
    console.log("Dynamic Promise Results:", results);
  } catch (error) {
    console.error("Error:", error);
  }
}

function fetchData(id: number): Promise<string> {
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

async function handleDataFlow(): Promise<void> {
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

sequentialPromises();
processArrayParallel(["hello", "world", "typescript"]);
handleDynamicPromises([1000, 500, 2000, 1500]);
handleDataFlow();
