import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db.js';
import userRouter from './routes/User.js'



dotenv.config();

// Initialize express app
const app = express();


//middlewares
app.use(express.json()); // parses JSON data
app.use(express.urlencoded({ extended: true })); // parses URL-encoded data


//routes
app.use('/user', userRouter);
export default app;
