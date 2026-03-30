import Category from "../models/CategoryModel.js";
import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";
import fs from "fs";
import bcrypt from "bcrypt";
import { title } from "process";

const importData = async () => {
  try {
    // clean the database
    await Course.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    //insert the data

    //insert user data
    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/data/users.json"), "utf-8"),
    );

    const usersWithHashedPass = usersData.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    const createdUsers = await User.insertMany(usersWithHashedPass);

    const instructorUser = createdUsers.find(
      (user) => user.role === "instructor",
    ); //to be used in course as ref

    //insert category data
    const categoryData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/data/category.json"), "utf-8"),
    );
    const createdCategory = await Category.insertMany(categoryData);
    const webDevCategory = createdCategory.find(
      (category) => category.role === "instructor",
    ); //to be used in course as ref

    //insert course
    const courses = [
      {
        title: "Complete Web Dev course 2026",
        description: "get hand on experince with react and node projects",
        price: 99,
        instructor: instructorUser.id,
        category: webDevCategory.id,
      },
    ];

    await Category.insertMany(courses);

    console.log("Data is successfully added to databse");
  } catch (error) {
    console.log("Error while adding data", error);
  }

  const destroyData = () => {
    //deleteMany quereis will go here
    console.log("Data destroyed");
  };

  //login to add script to run seed
};
