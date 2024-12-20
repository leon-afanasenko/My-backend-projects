function task3(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Task 3 completed"), 1500)
  );
}

export default task3;
