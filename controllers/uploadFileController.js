const { fileSchema } = require("../validations/fileValidation");
const { StatusCodes } = require("http-status-codes");

exports.uploadFile = (req, res) => {
  const { error } = fileSchema.validate(req.file);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });

  return res.json({
    message: "File uploaded successfully.",
    filename: req.file.filename,
    url: `uploads/${req.file.filename}`,
  });
};
