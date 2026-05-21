import express from "express";
import {
  getCourse,
  getCourseById,
  enrollStudentInCourse,
  myCourseById,
  myCourses,
} from "../controllers/courseController.js";
import { authProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//course routes
//my courses
router.get("/my-courses", authProtect, myCourses);
router.get("/my-courses/:id", authProtect, myCourseById);
//get all courses
router.get("/", getCourse);
//get details of a course against id
router.get("/:id", getCourseById);
//enroll user
router.post("/:id/enroll", authProtect, enrollStudentInCourse);


export default router;
