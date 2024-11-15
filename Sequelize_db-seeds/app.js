import express from "express";
import "dotenv/config";
import sequelize from "./config/db.js";
import { Product } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Welcome</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
          }
          a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Добро пожаловать!</h1>
        <p>Перейдите по ссылке, чтобы увидеть список продуктов:</p>
        <a href="http://localhost:3001/products">http://localhost:3001/products</a>
      </body>
    </html>
  `);
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = await Product.create({ name, price, description });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product." });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connected to the database and running on http://localhost:${PORT}`
    );
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
});
