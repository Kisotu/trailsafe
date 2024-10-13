import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

export default connectDB;
