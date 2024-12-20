function task1(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Task 1 done"), 1000)
  );
}

export default task1;
