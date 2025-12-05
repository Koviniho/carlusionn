import httpStatus from "http-status";
import Vehicle from "../models/vehicle.model.js";
import upload from "../middlewares/multer.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import paginAndFilter from "../utils/pagination.js";
import validate from "../middlewares/validate.js";
import vechileSchemas from "../validations/vehicle.validation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const addNewVehicle = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image file is required.",
        success: false,
      });
    }

    // Extract filenames from uploaded files
    const imageFilenames = req.files.map((file) => file.filename);

    const newVehicle = new Vehicle({
      ...req.body,
      images: imageFilenames, // Save filenames as an array
    });

    // Save the vehicle to the database
    await newVehicle.save();

    // Respond with success
    res.status(httpStatus.CREATED).json({
      message: "Vehicle added successfully.",
      success: true,
      vehicle: newVehicle,
    });
  } catch (error) {
    // Ensure all uploaded files are removed in case of an error
    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const filePath = path.join(
            "public",
            "data",
            "uploads",
            "vehicle",
            file.filename
          );

          try {
            fs.unlinkSync(filePath);
            console.log(`Deleted uploaded file: ${filePath}`);
          } catch (unlinkError) {
            console.error(
              `Failed to delete file: ${filePath}`,
              unlinkError.message
            );
          }
        })
      );
    }

    next(error);
  }
};

const getAllVehicles = async (req, res, next) => {
  try {
    const queryParams = req.query;
    const allVehicle = await Vehicle.find();
    // ["available", "sold", "reserved"],
    const availableVehicles = allVehicle.filter(
      (item) => item.status == "available"
    ).length;
    const soldVehicles = allVehicle.filter(
      (item) => item.status == "sold"
    ).length;
    const reservedVehicles = allVehicle.filter(
      (item) => item.status == "reserved"
    ).length;

    const { results, totalCount, pagination } = await paginAndFilter(
      Vehicle,
      queryParams
    );

    // Return the results along with metadata
    return res.status(httpStatus.OK).json({
      message: "Vehicle fetched successfully.",
      success: true,
      results,
      totalCount,
      pagination,
      availableVehicles,
      soldVehicles,
      reservedVehicles,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const getVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params; // Get vehicle ID from the request parameters
    const vehicle = await Vehicle.findById(id); // Fetch the vehicle by ID from the database

    if (!vehicle) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Vehicle not found.",
        success: false,
      });
    }

    return res.status(httpStatus.OK).json({
      message: "Vehicle fetched successfully.",
      success: true,
      vehicle,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the vehicle ID from the request parameters

    // Find the vehicle by ID
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Vehicle not found.",
        success: false,
      });
    }

    // Loop through all images and delete them from the server
    if (vehicle.images && vehicle.images.length > 0) {
      vehicle.images.forEach((image) => {
        const filePath = path.join(
          "public",
          "data",
          "uploads",
          "vehicle",
          image.trim()
        );
        try {
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filePath}`);
        } catch (error) {
          console.error(`Failed to delete file (${filePath}):`, error.message);
        }
      });
    }

    // Delete the vehicle from the database
    await Vehicle.findByIdAndDelete(id);

    // Respond with success
    return res.status(httpStatus.OK).json({
      message: "Vehicle deleted successfully.",
      success: true,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const updateVehicleById = async (req, res, next) => {
  try {
    const { vehicleId: id } = req.params;
    const {
      stockNo,
      year,
      price,
      mileage,
      location,
      status,
      brand,
      model,
      type,
      vehicleId,
    } = req.body;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Vehicle not found.",
        success: false,
      });
    }

    if (req.files && req.files.length > 0) {
      // Add new images from req.files
      const newImages = req.files.map((file) => file.filename);
      vehicle.images.push(...newImages);

      // If the images array has more than 4 items, delete the oldest ones
      while (vehicle.images.length > 4) {
        const oldestImage = vehicle.images.shift();

        // Build the file path for the oldest image
        const filePath = path.join(
          "public",
          "data",
          "uploads",
          "vehicle",
          oldestImage.trim()
        );

        try {
          // Delete the file from the server
          fs.unlinkSync(filePath);
          console.log(`Deleted old image: ${filePath}`);
        } catch (error) {
          console.error(`Failed to delete file (${filePath}):`, error.message);
        }
      }
    }

    // Update other fields if provided
    vehicle.stockNo = stockNo || vehicle.stockNo;
    vehicle.year = year || vehicle.year;
    vehicle.price = price || vehicle.price;
    vehicle.mileage = mileage || vehicle.mileage;
    vehicle.location = location || vehicle.location;
    vehicle.status = status || vehicle.status;
    vehicle.brand = brand || vehicle.brand;
    vehicle.model = model || vehicle.model;
    vehicle.type = type || vehicle.type;
    vehicle.vehicleId = vehicleId || vehicle.vehicleId;

    // Save the updated vehicle
    await vehicle.save();

    res.status(httpStatus.OK).json({
      message: "Vehicle updated successfully.",
      success: true,
      vehicle,
    });
  } catch (error) {
    // Handle cleanup if error occurs
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filePath = path.join(
          "public",
          "data",
          "uploads",
          "vehicle",
          file.filename
        );

        try {
          fs.unlinkSync(filePath);
          console.error("Removed uploaded image after error.");
        } catch (unlinkError) {
          console.error(
            "Failed to remove uploaded image after error:",
            unlinkError.message
          );
        }
      });
    }

    next(error);
  }
};

export {
  addNewVehicle,
  getAllVehicles,
  getVehicleById,
  deleteVehicle,
  updateVehicleById,
};
