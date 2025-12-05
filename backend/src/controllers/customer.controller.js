import httpStatus from "http-status";
import Customer from "../models/customer.model.js";
import paginAndFilter from "../utils/pagination.js";
import path, { dirname } from "path";
import fs from "fs";

const addNewCustomer = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Profile Pic  is required.",
        success: false,
      });
    }

    const newCustomer = new Customer({
      ...req.body,
      profileImage: req.file.filename,
    });

    // // Save the contract to the database
    await newCustomer.save();

    // Respond with success
    res.status(httpStatus.CREATED).json({
      message: "Customer added successfully.",
      success: true,
      customer: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCustomer = async (req, res, next) => {
  try {
    const queryParams = req.query;

    // Use the `paginAndFilter` function to fetch contracts
    const { results, totalCount, pagination } = await paginAndFilter(
      Customer,
      queryParams
    );

    // Respond with the populated results
    return res.status(200).json({
      message: "Customer fetched successfully.",
      success: true,
      results: results,
      totalCount,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Contract not found.",
        success: false,
      });
    }

    return res.status(httpStatus.OK).json({
      message: "Customer fetched successfully.",
      success: true,
      customer,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the vehicle ID from the request parameters

    // Find the vehicle by ID
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "customer not found.",
        success: false,
      });
    }

    const filePath = path.join(
      "public",
      "data",
      "uploads",
      "customer",
      customer.profileImage.trim()
    );
    console.log("filePath", filePath);
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("Failed to delete file:", error.message);
    }

    // Delete the vehicle from the database
    await Customer.findByIdAndDelete(id);

    // Respond with success
    return res.status(httpStatus.OK).json({
      message: "Customer  deleted successfully.",
      success: true,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const updateCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      customerName,
      email,
      phoneNunmber,
      lastInteraction,
      totalPurchases,
      companyName,
      insuranceProvider,
      address,
      licensePlateNumber,
      status,
    } = req.body;
    console.log("req.body", req.body);
    // Find the vehicle by ID
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "customer not found.",
        success: false,
      });
    }

    // If there's a new image in the request, remove the previous image and set the new one
    if (req.file) {
      const filePath = path.join(
        "public",
        "data",
        "uploads",
        "customer",
        customer.profileImage.trim()
      );

      // Delete the previous image if it exists
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error("Failed to delete previous image:", error.message);
      }

      // Assign the new image to the vehicle (assuming the image filename is available in req.file.filename)
      customer.profileImage = req.file.filename;
    }

    // Update the other fields (if provided)
    customer.customerName = customerName || customer.customerName;
    customer.email = email || customer.email;
    customer.phoneNunmber = phoneNunmber || customer.phoneNunmber;
    customer.lastInteraction = lastInteraction || customer.lastInteraction;
    customer.totalPurchases = totalPurchases || customer.totalPurchases;
    customer.companyName = companyName || customer.companyName;
    customer.address = address || customer.address;
    customer.insuranceProvider =
      insuranceProvider || customer.insuranceProvider;
    customer.licensePlateNumber =
      licensePlateNumber || customer.licensePlateNumber;
    customer.status = status || customer.status;

    // Save the updated vehicle to the database
    await customer.save();

    // Respond with the updated vehicle
    res.status(httpStatus.OK).json({
      message: "Customer updated successfully.",
      success: true,
      customer,
    });
  } catch (error) {
    next(error);
  }
};

export {
  addNewCustomer,
  getAllCustomer,
  getCustomerById,
  deleteCustomer,
  updateCustomerById,
};
