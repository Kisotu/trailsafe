import express from "express";
import UserController from "../controllers/AuthController.js";

const router = express.Router();

// Signup
router.post("/signup", UserController.signup);

// Signin
router.post("/signin", UserController.signin);

export default router;
