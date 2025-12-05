import mongoose from "mongoose";

// Define the customer schema
const customerSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String, // URL or path to the uploaded profile image
      required: false,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneNunmber: {
      type: String,
      required: true,
      trim: true,
    },
    lastInteraction: {
      type: Date,
      required: false, // Optional field for the last interaction date
    },
    totalPurchases: {
      type: Number,
      required: false,
      default: 0, // Default value if not specified
    },
    companyName: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    insuranceProvider: {
      type: String,
      required: false,
      trim: true,
    },
    licensePlateNumber: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "follow-up"], // Example values
      default: "active",
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
