const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection error:", err));

const movieSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    director: String,
  },
  { strict: false }
);

const Movie = mongoose.model("Movie", movieSchema);

app.get("/", (req, res) => {
  res.send("MongoDB connection established successfully!");
});

app.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const result = await Movie.findByIdAndDelete(req.params.id);
    if (result) res.send({ message: "Movie deleted successfully" });
    else res.status(404).send({ error: "Movie not found" });
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
