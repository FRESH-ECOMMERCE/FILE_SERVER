const { StatusCodes } = require("http-status-codes");
const ResponseData = require("../utils/response");
const appConfigs = require("../configs/appConfigs");

exports.authenticateToken = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || typeof apiKey !== "string") {
      const message = "Missing or invalid API Key.";
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ResponseData.error(message));
    }

    if (!appConfigs.apiKey.includes(apiKey)) {
      const message = "Invalid API Key.";
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ResponseData.error(message));
    }

    next();
  } catch (error) {
    const message = `Unable to process request! Error: ${error.message}`;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseData.error(message));
  }
};
