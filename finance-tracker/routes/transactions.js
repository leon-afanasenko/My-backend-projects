import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/create-user", async (req, res) => {
  try {
    const initialBalance = Math.floor(Math.random() * 10000) + 1000;
    const user = new User({
      initialBalance,
      currentBalance: initialBalance,
      transactions: [],
    });

    await user.save();

    res.status(201).json({
      message: "Пользователь создан",
      user: {
        id: user._id,
        initialBalance: user.initialBalance,
        currentBalance: user.currentBalance,
      },
    });
  } catch (error) {
    console.error("Ошибка создания пользователя:", error.message);
    res.status(500).json({ message: "Ошибка сервера. Попробуйте позже." });
  }
});

router.post("/add-expense/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Сумма расхода должна быть положительным числом." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    const expense = {
      type: "expense",
      amount,
      description,
      date: new Date(),
    };

    user.transactions.push(expense);
    user.currentBalance -= amount;

    await user.save();

    res.status(200).json({
      message: "Расход добавлен.",
      user: {
        currentBalance: user.currentBalance,
        transactions: user.transactions,
      },
    });
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    res.status(500).json({ message: "Ошибка сервера. Попробуйте позже." });
  }
});

router.get("/test", (req, res) => {
  res.send("Маршрут работает!");
});

export default router;
