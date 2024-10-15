import { Pin } from "../models/Pin.js";

const PinController = {
  // Edit pin
  editPin: async (req, res) => {
    try {
      const { id } = req.params;
      const { description, color, location } = req.body;
      if (!id) {
        return res.status(400).json({
          status: "FAILED",
          message: "Missing required fields",
        });
      }
      const pin = await Pin.findById(id).exec();
      if (!pin) {
        return res.status(404).json({
          status: "FAILED",
          message: "Pin not found",
        });
      }
      if (description) pin.description = description;
      if (color) pin.color = color;
      if (location) {
        pin.location = {
          type: "Point",
          coordinates: location.split(",").map(Number),
        };
      }
      await pin.save();
      res.json({
        status: "SUCCESS",
        message: "Pin updated successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "FAILED",
        message: "Error updating pin",
      });
    }
  },

  // Delete pin
  deletePin: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          status: "FAILED",
          message: "Missing required fields",
        });
      }
      const pin = await Pin.findByIdAndRemove(id).exec();
      if (!pin) {
        return res.status(404).json({
          status: "FAILED",
          message: "Pin not found",
        });
      }
      res.json({
        status: "SUCCESS",
        message: "Pin deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "FAILED",
        message: "Error deleting pin",
      });
    }
  },
};

export default PinController;
