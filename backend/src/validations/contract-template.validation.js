import Joi from "joi";

const contractTemplateValidationSchema = Joi.object({
  templateName: Joi.string().trim().max(100).required().messages({
    "string.empty": "Template name is required.",
    "string.max": "Template name must not exceed 100 characters.",
  }),
  templateId: Joi.string().trim().required(),
  createdBy: Joi.string().trim().max(50).required().messages({
    "string.empty": "Created by field is required.",
    "string.max": "Creator name must not exceed 50 characters.",
  }),
  contractType: Joi.string()
    .trim()
    .valid("Sales", "Lease")
    .required()
    .messages({
      "any.only": "Invalid contract type.",
      "string.empty": "Contract type is required.",
    }),
});

export default contractTemplateValidationSchema;
