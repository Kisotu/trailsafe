import express from "express";

//pin
import { Pin } from "../models/Pin.js";

const router = express.Router();

//get pins
router.get("/pins", async (req, res) => {
  try {
    const pins = await Pin.find().exec();
    res.json(pins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
		status: "FAILED",
		message: "Error fetching pins" });
  }
});

//add pin
router.post("/add-pin", async (req, res) => {
  try {
    const { description, color, addedBy, location } = req.body;
    if (!description || !color || !addedBy || !location) {
      return res.status(400).json({
        status: "FAILED",
        message: "Missing required fields",
      });
    }
    if (!color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid color format",
      });
    }
    const pin = new Pin({
      description,
      color,
      addedBy,
      location: {
        type: "Point",
        coordinates: location.split(",").map(Number),
      },
    });
	//add pin
    await pin.save();
    res.json({
      status: "SUCCESS",
      message: "Pin added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "",
      message: "Error adding pin",
    });
  }
});

export default router;
