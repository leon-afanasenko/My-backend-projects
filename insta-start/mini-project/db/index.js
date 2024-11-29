import { MongoClient } from "mongodb";

let db;

export const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db();
  console.log("Connected to MongoDB");
};

export const getDB = () => db;
