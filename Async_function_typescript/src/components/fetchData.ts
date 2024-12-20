import fetch from "node-fetch";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

async function fetchData(): Promise<User[]> {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const users: User[] = data as User[];
    console.log("Data fetched:", users);
    return users;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}

export default fetchData;
