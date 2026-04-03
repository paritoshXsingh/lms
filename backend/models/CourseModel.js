import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  instructor: { type: Schema.ObjectId, ref: "User", required: true },
  category: { type: Schema.ObjectId, ref: "Category", required: true },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
