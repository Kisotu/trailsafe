import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRouter from "./routes/Auth.js";
import pinRouter from "./routes/Pins.js";
import userRouter from './routes/Users.js'
import cors from 'cors'

dotenv.config();

// Initialize express app
const app = express();

//middlewares
app.use(express.json()); // parses JSON data
app.use(express.urlencoded({ extended: true })); // parses URL-encoded data
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173'
	})
)

//routes
app.use("/auth", authRouter);
app.use("/pins", pinRouter);
app.use('/users', userRouter);

export default app;
