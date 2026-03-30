import express from "express";
import {getCategory} from "../controllers/categoryController.js";

const router = express.Router();

//course routes
//get all categories
router.get("/", getCategory);

export default router;
