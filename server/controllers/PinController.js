import { Pin } from "../models/Pin.js";

const PinController = {
  // Edit pin
  editPin: async (req, res) => {
    try {
      const { id } = req.params;
      const { description, color, location, difficulty, length, time } = req.body;
      
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
      if (difficulty) pin.difficulty = difficulty;
      if (length !== undefined) pin.length = length;
      if (time !== undefined) pin.time = time;
      
      await pin.save();
      
      res.json({
        status: "SUCCESS",
        message: "Pin updated successfully",
        data: pin,
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

  // Add new methods

  // Create pin
  // createPin: async (req, res) => {
  //   try {
  //     const { description, color, location, difficulty, length, time, addedBy } = req.body;
      
  //     if (!description || !color || !location || !difficulty || length === undefined || time === undefined || !addedBy) {
  //       return res.status(400).json({
  //         status: "FAILED",
  //         message: "Missing required fields",
  //       });
  //     }
      
  //     const newPin = new Pin({
  //       description,
  //       color,
  //       location: {
  //         type: "Point",
  //         coordinates: location.split(",").map(Number),
  //       },
  //       difficulty,
  //       length,
  //       time,
  //       addedBy,
  //     });
      
  //     await newPin.save();
      
  //     res.status(201).json({
  //       status: "SUCCESS",
  //       message: "Pin created successfully",
  //       data: newPin,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({
  //       status: "FAILED",
  //       message: "Error creating pin",
  //     });
  //   }
  // },
  createPin: async (req, res) => {
    try {
      const { description, color, location, difficulty, length, time, addedBy } = req.body;
      
      if (!description || !color || !location || !difficulty || length === undefined || time === undefined || !addedBy) {
        return res.status(400).json({
          status: "FAILED",
          message: "Missing required fields",
        });
      }
      
      // Validate the type of location
      if (typeof location !== 'string') {
        return res.status(400).json({
          status: "FAILED",
          message: "Location must be a string in the format of 'latitude,longitude'",
        });
      }
      
      // Split the location string into latitude and longitude
      const locationParts = location.split(",");
      
      // Validate the length of the location parts
      if (locationParts.length !== 2) {
        return res.status(400).json({
          status: "FAILED",
          message: "Location must be in the format of 'latitude,longitude'",
        });
      }
      
      // Validate the latitude and longitude values
      const latitude = parseFloat(locationParts[0]);
      const longitude = parseFloat(locationParts[1]);
      
      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Latitude and longitude must be numbers",
        });
      }
      
      const newPin = new Pin({
        description,
        color,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        difficulty,
        length,
        time,
        addedBy,
      });
      
      await newPin.save();
      
      res.status(201).json({
        status: "SUCCESS",
        message: "Pin created successfully",
        data: newPin,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "FAILED",
        message: "Error creating pin",
      });
    }
  },

  // Get all pins
  getAllPins: async (req, res) => {
    try {
      const pins = await Pin.find().exec();
      
      res.json({
        status: "SUCCESS",
        data: pins,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "FAILED",
        message: "Error fetching pins",
      });
    }
  },

  // Get single pin
  getPin: async (req, res) => {
    try {
      const { id } = req.params;
      
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
      
      res.json({
        status: "SUCCESS",
        data: pin,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "FAILED",
        message: "Error fetching pin",
      });
    }
  },
};

export default PinController;