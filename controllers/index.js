const { StatusCodes } = require("http-status-codes");

exports.main = (req, res) => {
  res.status(StatusCodes.OK).json({
    message: `Welcome to Fresh Storage`,
    version: "1.1",
    documentation: "/api-docs",
  });
};
