import Joi from "joi";

const contractValidationSchema = Joi.object({
  contractId: Joi.string().trim().required(),
  customerName: Joi.string().trim().max(100).required(),
  carModel: Joi.string().trim().max(100).required(),
  status: Joi.string()
    .trim()
    .valid("Signed", "Draft", "Expired", "Pending")
    .required(),
});

export default contractValidationSchema;
