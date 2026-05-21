import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import bcrypt from "bcrypt";

import connectDB from "../config/db.js";
import Category from "../models/CategoryModel.js";
import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";
import demoCourses from "./demoCourses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

await connectDB();

const loadJson = (fileName) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, fileName), "utf-8"));

const importDemoData = async () => {
  try {
    await Course.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    const usersData = loadJson("users.json");
    const categoryData = loadJson("category.json");

    const usersWithHashedPasswords = usersData.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);

      return { ...user, password: hashedPassword };
    });

    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    const createdCategories = await Category.insertMany(categoryData);

    const instructorUser = createdUsers.find(
      (user) => user.role === "instructor",
    );
    const studentUser = createdUsers.find(
      (user) => user.email === "student@example.com",
    );

    if (!instructorUser) {
      throw new Error("Demo seeder could not find an instructor user.");
    }

    if (!studentUser) {
      throw new Error("Demo seeder could not find the test student user.");
    }

    const categoryMap = new Map(
      createdCategories.map((category) => [category.name, category]),
    );
    const userMap = new Map(createdUsers.map((user) => [user.email, user]));

    const coursesToInsert = demoCourses.map((course) => {
      const category = categoryMap.get(course.categoryName);

      if (!category) {
        throw new Error(
          `Demo seeder could not find category '${course.categoryName}'.`,
        );
      }

      const enrolledStudents = (course.enrolledStudentEmails || []).map(
        (email) => {
          const user = userMap.get(email);

          if (!user) {
            throw new Error(
              `Demo seeder could not find enrolled student '${email}'.`,
            );
          }

          return user._id;
        },
      );

      return {
        title: course.title,
        desc: course.desc,
        price: course.price,
        instructor: instructorUser._id,
        category: category._id,
        modules: course.modules,
        enrolledStudents,
      };
    });

    await Course.insertMany(coursesToInsert);

    console.log(
      `Demo data imported successfully: ${coursesToInsert.length} courses across ${createdCategories.length} categories.`,
    );
    console.log(
      `Test student '${studentUser.email}' is pre-enrolled in ${coursesToInsert.filter((course) => course.enrolledStudents.length > 0).length} courses.`,
    );
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

  console.log("Demo data destroyed");
  process.exit();
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importDemoData();
}
