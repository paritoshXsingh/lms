import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 3002;

import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes); //goes to authRoute
app.use("/api/courses", courseRoutes); //goes to courseRoutes
app.use("/api/category", categoryRoutes); //goes to categoryRoutes
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes); //user profile routes

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
