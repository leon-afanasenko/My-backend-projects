import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  sID: { type: Number, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  score: { type: Number, required: true },
});

export default mongoose.model("Student", studentSchema);
