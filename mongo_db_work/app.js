import express from "express";
import { connectToDatabase, getDb } from "./db/index.js";
import { ObjectId } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectToDatabase()
  .then(() => {
    console.log("Database connection established");

    app.get("/users", async (req, res) => {
      try {
        const db = getDb();
        const users = await db.collection("users").find().toArray();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
      }
    });

    app.get("/users/:id", async (req, res) => {
      try {
        const db = getDb();
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
          return res.status(400).json({ error: "Invalid user ID" });
        }

        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch user" });
      }
    });

    app.post("/users", async (req, res) => {
      try {
        const db = getDb();
        const user = req.body;

        if (!user.name || !user.email) {
          return res.status(400).json({ error: "Name and email are required" });
        }

        const result = await db.collection("users").insertOne(user);
        const createdUser = await db
          .collection("users")
          .findOne({ _id: result.insertedId });

        res.status(201).json(createdUser);
      } catch (err) {
        res.status(500).json({ error: "Failed to create user" });
      }
    });

    app.put("/users/:id", async (req, res) => {
      try {
        const db = getDb();
        const userId = req.params.id;
        const updateData = req.body;

        if (!ObjectId.isValid(userId)) {
          return res.status(400).json({ error: "Invalid user ID" });
        }

        const result = await db
          .collection("users")
          .updateOne({ _id: new ObjectId(userId) }, { $set: updateData });

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
      } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
      }
    });

    app.delete("/users/:id", async (req, res) => {
      try {
        const db = getDb();
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
          return res.status(400).json({ error: "Invalid user ID" });
        }

        const result = await db
          .collection("users")
          .deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
