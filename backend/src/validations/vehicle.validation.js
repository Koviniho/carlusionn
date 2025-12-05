import Joi from "joi";

const vehicleValidationSchema = Joi.object({
  vehicleId: Joi.string().trim().required(), // Validation for vehicleId
  // images: Joi.array().items(Joi.string().trim().required()).min(1).required(), // Validation for images as an array of strings
  stockNo: Joi.string().trim().required(),
  year: Joi.number().integer().min(1886).required(),
  price: Joi.number().min(0).required(),
  mileage: Joi.number().min(0).required(),
  location: Joi.string().trim().required(),
  status: Joi.string().valid("available", "sold", "reserved").required(),
  brand: Joi.string().trim().required(), // Validation for brand
  model: Joi.string().trim().required(), // Validation for model
  type: Joi.string().trim().required(), // Validation for type
  // totalStock: Joi.number().integer().min(0).required(), // Validation for totalStock
});

export default vehicleValidationSchema;
