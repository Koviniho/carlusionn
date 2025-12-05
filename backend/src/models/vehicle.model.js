import mongoose from "mongoose";

// Define the vehicle schema
const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      unique: true, // Ensures the ID is unique
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
        trim: true, // Trims whitespace
      },
    ],
    stockNo: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1886, // The first car was invented in 1886
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensures price is non-negative
    },
    mileage: {
      type: Number,
      required: true,
      min: 0, // Ensures mileage is non-negative
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "sold", "reserved"], // Allowed values for status
      default: "available", // Default status
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
 
  },
  { timestamps: true }
);

// Create and export the Vehicle model
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
