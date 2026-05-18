import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";

const router = express.Router();
import { authProtect } from "../middlewares/authMiddleware.js";

//payment intent routes
router.post("/create-payment-intent", authProtect, createPaymentIntent);

export default router;
