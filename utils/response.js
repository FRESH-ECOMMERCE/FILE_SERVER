const appConfigs = require("../configs/appConfigs");

const ResponseData = {
  error: (message) => {
    return {
      requestParam: null,
      status: "error",
      errorMessage: message,
      data: null,
      next: null,
      version: { code: appConfigs.appVersion },
    };
  },

  success: (data = null, next = null) => {
    return {
      requestParam: null,
      status: "success",
      errorMessage: null,
      data,
      next,
      version: { code: appConfigs.appVersion },
    };
  },
};

module.exports = ResponseData;
