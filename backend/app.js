import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 3003;

import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

connectDB();

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes); //goes to authRoute
app.use("/api/course", courseRoutes); //goes to courseRoutes
app.use("/api/category", categoryRoutes); //goes to categoryRoutes

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
