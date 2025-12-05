import httpStatus from "http-status";
import Contracts from "../models/contract.model.js";
import paginAndFilter from "../utils/pagination.js";
import ContractsTemplate from "../models/contract-template.model.js";

const addNewContract = async (req, res, next) => {
  try {
    const newContract = new Contracts({
      ...req.body,
    });

    // // Save the contract to the database
    await newContract.save();

    // Respond with success
    res.status(httpStatus.CREATED).json({
      message: "Contract added successfully.",
      success: true,
      // contract: newContract,
    });
  } catch (error) {
    next(error);
  }
};

const getAllContracts = async (req, res, next) => {
  try {
    const queryParams = req.query;

    // Use the `paginAndFilter` function to fetch contracts
    const { results, totalCount, pagination } = await paginAndFilter(
      Contracts,
      queryParams
    );

    // Populate contractId, customerName, and carModel fields
    const populatedResults = await Contracts.find({
      _id: { $in: results.map((r) => r._id) },
    })
      .populate({
        path: "contractId", // Reference to ContractsTemplate
      })
      .populate({
        path: "customerName", // Reference to User
        // select: "-password", // Exclude 'unwantedField'
      })
      .populate({
        path: "carModel", // Reference to Vehicle
      });

    // Respond with the populated results
    return res.status(200).json({
      message: "Contracts fetched successfully.",
      success: true,
      results: populatedResults,
      totalCount,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getContractById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.findById(id)
      .populate("contractId")
      .populate({
        path: "customerName",
      })
      .populate({
        path: "carModel",
      });
    if (!contract) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Contract not found.",
        success: false,
      });
    }

    return res.status(httpStatus.OK).json({
      message: "Contract fetched successfully.",
      success: true,
      contract,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContract = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the contract ID from the request parameters

    const contract = await Contracts.findById(id);

    if (!contract) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Contract not found.",
        success: false,
      });
    }

    // Delete the contract from the database
    await Contracts.findByIdAndDelete(id);

    return res.status(httpStatus.OK).json({
      message: "Contract deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const updateContractById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { contractId, customerName, carModel, salesPerson, status } =
      req.body;

    const contract = await Contracts.findById(id);

    if (!contract) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Contract not found.",
        success: false,
      });
    }

    // Update fields if provided
    contract.customerName = customerName || contract.customerName;
    contract.carModel = carModel || contract.carModel;
    contract.salesPerson = salesPerson || contract.salesPerson;
    contract.status = status || contract.status;
    contract.contractId = contractId || contract.contractId;

    // Save the updated contract to the database
    await contract.save();

    res.status(httpStatus.OK).json({
      message: "Contract updated successfully.",
      success: true,
      contract,
    });
  } catch (error) {
    next(error);
  }
};

export {
  addNewContract,
  getAllContracts,
  getContractById,
  deleteContract,
  updateContractById,
};
