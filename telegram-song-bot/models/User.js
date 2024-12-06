const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    maxLength: 20,
  },
  status: {
    type: String,
    required: false,
    default: "MAIN",
    trim: true,
  },
  lang: {
    type: String,
    default: "EN",
    required: true,
  },
  quality: {
    type: mongoose.SchemaTypes.Number,
    default: 128,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
