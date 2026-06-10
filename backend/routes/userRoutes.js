import express from "express";

const router = express.Router();

import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  becomeInstructor,
} from "../controllers/userController.js";

import { authProtect } from "../middlewares/authMiddleware.js";

//get user profile info
router.get("/profile", authProtect, getUserProfile);

//update user profile
router.put("/profile", authProtect, updateUserProfile);

//update user password
router.put("/profile/password", authProtect, updateUserPassword);

//become instructor
router.patch("/become-instructor", authProtect, becomeInstructor);

export default router;
