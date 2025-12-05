import mongoose from "mongoose";

// Define the contract schema
const contractsTemplateSchema = new mongoose.Schema(
  {
    templateId: {
      type: String,
      required: true,
    },
    templateName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    contractFile: {
      type: String,
      required: true,
    },
    contractType: {
      type: String,
      enum: ["Sales", "Lease"],
      required: true,
    },
  },
  { timestamps: true }
);

const ContractsTemplate = mongoose.model(
  "ContractsTemplate",
  contractsTemplateSchema
);

export default ContractsTemplate;
