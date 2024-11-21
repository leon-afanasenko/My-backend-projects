import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let dbConnection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");
    dbConnection = client.db();
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas", err);
    throw err;
  }
}

function getDb() {
  if (!dbConnection) {
    throw new Error("Database not connected!");
  }
  return dbConnection;
}

export { connectToDatabase, getDb };
