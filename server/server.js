// server.js
import app from './app';
import connectDB from './db';

// Connect to the database
connectDB();

// Listen to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
