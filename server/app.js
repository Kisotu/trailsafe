import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRouter from "./routes/User.js";
import pinRouter from "./routes/Pins.js";

dotenv.config();

// Initialize express app
const app = express();

//middlewares
app.use(express.json()); // parses JSON data
app.use(express.urlencoded({ extended: true })); // parses URL-encoded data

//routes
app.use("/users", userRouter);
app.use("/pins", pinRouter);
export default app;
