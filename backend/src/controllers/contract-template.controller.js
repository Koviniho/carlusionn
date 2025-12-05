import httpStatus from "http-status";
import upload from "../middlewares/multer.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import paginAndFilter from "../utils/pagination.js";
import ContractsTemplate from "../models/contract-template.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const addNewContractTemplate = async (req, res, next) => {
  try {
    console.log("inside controller");
    if (!req.file) {
      return res.status(400).json({
        message: "File is required.",
        success: false,
      });
    }

    const newContractTemplate = new ContractsTemplate({
      ...req.body,
      contractFile: req.file.filename, // Save the filename or path
    });

    // Save the contract template to the database
    await newContractTemplate.save();

    res.status(201).json({
      message: "Contract Template added successfully.",
      success: true,
      newContractTemplate,
    });
  } catch (error) {
    next(error);
  }
};

const getAllContractTemplates = async (req, res, next) => {
  try {
    const queryParams = req.query;
    const { results, totalCount, pagination } = await paginAndFilter(
      ContractsTemplate,
      queryParams
    );

    return res.status(httpStatus.OK).json({
      message: "Contract Templates fetched successfully.",
      success: true,
      results,
      totalCount,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getContractTemplateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contractTemplate = await ContractsTemplate.findById(id);

    if (!contractTemplate) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Contract Template not found.",
        success: false,
      });
    }

    return res.status(httpStatus.OK).json({
      message: "Contract Template fetched successfully.",
      success: true,
      contractTemplate,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContractTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contractTemplate = await ContractsTemplate.findById(id);

    if (!contractTemplate) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Contract Template not found.",
        success: false,
      });
    }
    const filePath = path.join(
      "public",
      "data",
      "uploads",
      "contractTemplates",
      contractTemplate.contractFile.trim()
    );

    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("Failed to delete file:", error.message);
    }

    await ContractsTemplate.findByIdAndDelete(id);

    return res.status(httpStatus.OK).json({
      message: "Contract Template deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateContractTemplateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { templateId, templateName, createdBy, contractType } = req.body;

    // Find the existing contract template by ID
    const contractTemplate = await ContractsTemplate.findById(id);

    if (!contractTemplate) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Contract Template not found.",
        success: false,
      });
    }

    // If there's a new file, remove the previous file and set the new one
    if (req.file) {
      const filePath = path.join(
        "public",
        "data",
        "uploads",
        "contractTemplates",
        contractTemplate.contractFile.trim()
      );

      try {
        fs.unlinkSync(filePath); // Remove previous file from disk
      } catch (error) {
        console.error("Failed to delete previous file:", error.message);
      }

      // Update the contractFile with the new file name
      contractTemplate.contractFile = req.file.filename;
    }

    // Update the fields with the values from req.body if provided
    contractTemplate.templateId = templateId || contractTemplate.templateId;
    contractTemplate.templateName =
      templateName || contractTemplate.templateName;
    contractTemplate.createdBy = createdBy || contractTemplate.createdBy;
    contractTemplate.contractType =
      contractType || contractTemplate.contractType;

    // Save the updated contract template
    await contractTemplate.save();

    // Respond with a success message and the updated contract template
    res.status(httpStatus.OK).json({
      message: "Contract Template updated successfully.",
      success: true,
      contractTemplate,
    });
  } catch (error) {
    next(error);
  }
};
export {
  addNewContractTemplate,
  getAllContractTemplates,
  getContractTemplateById,
  deleteContractTemplate,
  updateContractTemplateById,
};
