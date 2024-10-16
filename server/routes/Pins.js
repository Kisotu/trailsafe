import express from "express";
import PinController from "../controllers/PinController.js";

const router = express.Router();

// Get all pins
router.get("/", PinController.getAllPins);

// Get a single pin
router.get("/:id", PinController.getPin);

// Add pin
router.post("/", PinController.createPin);

// Edit pin
router.put("/:id", PinController.editPin);

// Delete pin
router.delete("/:id", PinController.deletePin);

export default router;
