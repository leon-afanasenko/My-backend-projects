import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/api/cart", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/api/cart", async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const newProduct = await Product.create({ name, quantity, price });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error.message);
    res.status(400).json({ message: "Ошибка при добавлении продукта" });
  }
});

router.put("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Продукт не найден" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error("Ошибка при обновлении продукта:", error.message);
    res.status(400).json({ message: "Ошибка при обновлении продукта" });
  }
});

router.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Продукт не найден" });
    }
    res.json({ message: "Продукт удален" });
  } catch (error) {
    console.error("Ошибка при удалении продукта:", error.message);
    res.status(500).json({ message: "Ошибка при удалении продукта" });
  }
});

export default router;
