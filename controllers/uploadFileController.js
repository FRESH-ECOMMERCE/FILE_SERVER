const { fileSchema } = require('../validations/fileValidation');
const { StatusCodes } = require('http-status-codes');
const { FileStorage } = require('../models');

exports.uploadFile = async (req, res) => {
    const { error } = fileSchema.validate(req.file);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });

    await FileStorage.create({ name: req.file.filename });

    return res.json({
        message: 'File uploaded successfully.',
        url: req.file.filename,
    });
};
