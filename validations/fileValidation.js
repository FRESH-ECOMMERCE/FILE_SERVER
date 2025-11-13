const Joi = require('joi');

exports.fileSchema = Joi.object({
    originalname: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
    size: Joi.number()
        .max(2 * 1024 * 1024)
        .required(),
}).unknown();
