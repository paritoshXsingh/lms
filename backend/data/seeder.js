import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import bcrypt from "bcrypt";

import connectDB from "../config/db.js";
import Category from "../models/CategoryModel.js";
import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

await connectDB();

const importData = async () => {
  try {
    await Course.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    // Users
    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "users.json"), "utf-8"),
    );

    const usersWithHashedPass = usersData.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    const createdUsers = await User.insertMany(usersWithHashedPass);

    const instructorUser = createdUsers.find(
      (user) => user.role === "instructor",
    );

    // Categories
    const categoryData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "category.json"), "utf-8"),
    );

    const createdCategory = await Category.insertMany(categoryData);

    const webDevCategory = createdCategory.find((cat) => cat.name === "Web Dev");

    if (!instructorUser) {
      throw new Error("Seeder could not find an instructor user in users.json");
    }

    if (!webDevCategory) {
      throw new Error("Seeder could not find the 'Web Dev' category in category.json");
    }

    // Courses
    const courses = [
      {
        title: "Complete Web Dev course 2026",
        desc: "get hands-on experience with React and Node projects",
        price: 99,
        instructor: instructorUser._id,
        category: webDevCategory._id,
      },
    ];

    await Course.insertMany(courses);

    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  await Course.deleteMany();
  await Category.deleteMany();
  await User.deleteMany();

  console.log("Data destroyed");
  process.exit();
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
