import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@trailsafe.mytqb.mongodb.net/?retryWrites=true&w=majority&appName=trailsafe`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await mongoose.disconnect();
  }
}
connectDB().catch(console.dir);

export default connectDB;