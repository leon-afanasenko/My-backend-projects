import express from "express";
import cors from "cors";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
