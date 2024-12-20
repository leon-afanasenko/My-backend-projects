function task2(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Task 2 done"), 2000)
  );
}

export default task2;
