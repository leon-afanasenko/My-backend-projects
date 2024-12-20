// npx ts-node src/index.ts
import task1 from "./components/task1";
import task2 from "./components/task2";
import task3 from "./components/task3";
import fetchData from "./components/fetchData";

async function runTasks() {
  try {
    const results = await Promise.all([task1(), task2(), task3()]);
    console.log("Results of tasks:", results);

    const data = await fetchData();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error running tasks:", error);
  }
}

runTasks();
