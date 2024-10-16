import bcrypt from "bcrypt";
import { User } from "../models/User.js";

const UserController = {
  // Signup
  signup: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      name = name.trim();
      email = email.trim();
      password = password.trim();

      if (name === "" || email === "" || password === "") {
        return res.status(400).json({
          status: "FAILED",
          message: "Empty input field!",
        });
      }

      if (!/^[a-zA-Z\s]*$/.test(name)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Invalid name entered!",
        });
      }

      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Invalid email entered!",
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          status: "FAILED",
          message: "Password is too short!",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: "FAILED",
          message: "User with provided email already exists!",
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      res.status(201).json({
        status: "SUCCESS",
        message: "Signup successful!",
        data: savedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "FAILED",
        message: "An error occurred during the signup process.",
      });
    }
  },

  // Signin
  signin: async (req, res) => {
    try {
      let { email, password } = req.body;
      email = email.trim();
      password = password.trim();

      if (email === "" || password === "") {
        return res.status(400).json({
          status: "FAILED",
          message: "Empty credentials supplied",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          status: "FAILED",
          message: "Invalid credentials",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          status: "FAILED",
          message: "Invalid password entered",
        });
      }

      res.json({
        status: "SUCCESS",
        message: "Signin Successful",
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "FAILED",
        message: "An error occurred during the signin process.",
      });
    }
  },
};

export default UserController;
