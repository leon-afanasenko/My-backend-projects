require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.js");
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
