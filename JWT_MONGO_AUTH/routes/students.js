import express from "express";
import mongoose from "mongoose";
import Student from "../models/Student.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения данных", error });
  }
});

// Добавление массива студентов за один раз
router.post("/bulk", async (req, res) => {
  const students = req.body;

  try {
    const formattedStudents = students.map((student) => {
      if (student._id) {
        student._id = new mongoose.Types.ObjectId(student._id);
      }
      return student;
    });

    const newStudents = await Student.insertMany(formattedStudents);
    res.status(201).json(newStudents);
  } catch (error) {
    res.status(500).json({ message: "Ошибка добавления студентов", error });
  }
});

router.post("/", async (req, res) => {
  const { sID, name, year, score } = req.body;

  try {
    const newStudent = new Student({ sID, name, year, score });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Ошибка добавления студента", error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления", error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Студент удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка удаления", error });
  }
});

export default router;
