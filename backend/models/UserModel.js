import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "", trim: true, maxlength: 300 },
  university: { type: String, default: "", trim: true, maxlength: 120 },
  yearOfPassing: { type: Number, default: null, min: 1900, max: 3000 },
  contact: { type: String, default: "", trim: true, maxlength: 30 },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
