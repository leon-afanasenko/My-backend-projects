const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Publisher = require("./models/Publisher");
const Magazine = require("./models/Magazine");
const Tag = require("./models/Tag");
const Article = require("./models/Article");

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/publishers", async (req, res) => {
  try {
    const newPublisher = new Publisher(req.body);
    await newPublisher.save();
    res.status(201).json(newPublisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/publishers", async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/magazines", async (req, res) => {
  try {
    const newMagazine = new Magazine(req.body);
    await newMagazine.save();
    res.status(201).json(newMagazine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/magazines", async (req, res) => {
  try {
    const magazines = await Magazine.find().populate("publisher");
    res.json(magazines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/tags", async (req, res) => {
  try {
    const newTag = new Tag(req.body);
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find().populate("articles");
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/articles", async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find().populate("tags");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
