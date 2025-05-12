const Joi = require("joi");

exports.fileSchema = Joi.object({
  originalname: Joi.string().required(),
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "application/pdf")
    .required(),
  size: Joi.number()
    .max(5 * 1024 * 1024)
    .required(),
}).unknown();
