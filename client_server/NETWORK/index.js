import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Настраиваем multer
const upload = multer({ dest: "uploads/" }); // Файлы будут сохраняться в папке 'uploads/'

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    const file = req.file; // Данные о загруженном файле
    console.log("Uploaded file:", file);

    res.status(200).json({ message: "Image uploaded successfully!", file });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload image." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
