// controllers/healthController.js
const { StatusCodes } = require("http-status-codes");

const startTime = Date.now();

exports.healthCheck = (req, res) => {
  const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000);

  res.status(StatusCodes.OK).json({
    status: "ok",
    uptime: `${uptimeInSeconds}s`,
    timestamp: process.uptime(),
  });
};
