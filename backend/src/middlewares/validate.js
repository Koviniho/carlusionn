import Joi from "joi";
import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/api.error.js";

// const validate = (schema) => (req, res, next) => {
// Combine all possible request data to validate
// const dataToValidate = {
//   params: req.params,
//   query: req.query,
//   body: req.body,
//   headers: req.headers,
//   files: req.files,
// };
// console.log(req.body)

// // Validate data against the schema
// const { error, value } = Joi.object(schema)
//   .prefs({ errors: { label: "key" }, abortEarly: false }) // Detailed errors, validate all fields
//   .validate(dataToValidate);

// if (error) {
//   // Log the error for debugging
//   console.error("Validation Error:", error);

//   // Construct a user-friendly error message
//   const errorMessage = error.details
//     .map((detail) => detail.message.replace(/\"/g, ""))
//     .join(", ");

//   // Pass the error to the next middleware
//   return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
// }

// // Assign validated data back to the request object
// Object.assign(req, value);
//   next();
// };

const validate = (schema) => (req, res, next) => {
  let { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export default validate;
