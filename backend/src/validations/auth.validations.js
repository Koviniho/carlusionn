import Joi from "joi";

// Custom regex for stricter email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginSchema = Joi.object({
  emailOrUsername: Joi.alternatives()
    .try(
      Joi.string().pattern(emailRegex).required(), // Valid email pattern
      Joi.string().min(3).max(30).required() // Valid username (length between 3 to 30 characters)
    )
    .messages({
      "alternatives.match": "You must provide a valid email or username",
    }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
  }),
  rememberMe: Joi.boolean().optional(),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required().trim().lowercase(),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.pattern.base":
      "Password must contain at least one letter and one number",
  }),
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .trim()
    .pattern(/^[^@]*$/) // Disallow '@' in the username
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must not exceed 30 characters",
      "string.pattern.base": "Username cannot contain the '@' character",
    }),
  licenseKey: Joi.string().required().messages({
    "string.empty": "License key is required",
  }),
});

// Functions to validate login and register
// const validateLogin = (data) => {
//   return loginSchema.validate(data, { abortEarly: false });
// };

// const validateRegister = (data) => {
//   return registerSchema.validate(data, { abortEarly: false });
// };

const authValidation = {
  registerSchema,
  loginSchema,
};
export default authValidation;
