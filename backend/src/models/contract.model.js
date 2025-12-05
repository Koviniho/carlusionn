import mongoose from "mongoose";

// Define the contract schema
const contractsSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContractsTemplate",
      required: true,
    },
    customerName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    carModel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["Signed", "Draft", "Expired", "Pending"], // Allowed values for the status field
    },
  },
  { timestamps: true }
);

// Create and export the Contracts model
const Contracts = mongoose.model("Contracts", contractsSchema);
export default Contracts;
