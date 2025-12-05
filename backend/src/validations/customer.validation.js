import Joi from "joi";

// Define the validation schema
const customerValidationSchema = Joi.object({
  customerName: Joi.string().trim().required().label("Customer Name").messages({
    "any.required": "Customer Name is required.",
    "string.empty": "Customer Name cannot be empty.",
  }),
  email: Joi.string().email().required().label("Email").messages({
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  phoneNunmber: Joi.string()
    .pattern(/^[+\d\s-]{10,15}$/)
    .required()
    .label("Phone Number")
    .messages({
      "string.pattern.base":
        "Phone Number must contain 10 to 15 characters, including digits, spaces, or the symbols '+' and '-'.",
      "any.required": "Phone Number is required.",
    }),
  lastInteraction: Joi.date().optional().label("Last Interaction").messages({
    "date.base": "Last Interaction must be a valid date.",
  }),
  totalPurchases: Joi.number()
    .integer()
    .min(0)
    .optional()
    .label("Total Purchases")
    .messages({
      "number.base": "Total Purchases must be a number.",
      "number.min": "Total Purchases cannot be negative.",
    }),
  companyName: Joi.string().trim().optional().label("Company Name").messages({
    "string.empty": "Company Name cannot be empty.",
  }),
  address: Joi.string().trim().optional().label("Address").messages({
    "string.empty": "Address cannot be empty.",
  }),
  insuranceProvider: Joi.string()
    .trim()
    .optional()
    .label("Insurance Provider")
    .messages({
      "string.empty": "Insurance Provider cannot be empty.",
    }),
  licensePlateNumber: Joi.string()
    .trim()
    .optional()
    .label("License Plate Number")
    .messages({
      "string.empty": "License Plate Number cannot be empty.",
    }),
  status: Joi.string()
    .valid("active", "inactive", "follow-up")
    .required()
    .label("Status")
    .messages({
      "any.only": "Status must be one of 'active', 'inactive', or 'follow-up'.",
      "any.required": "Status is required.",
    }),
});
export default customerValidationSchema;
