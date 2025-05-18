require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./configs/swaggerCofigs");
const logger = require("./utils/logger");
const uploadRoutes = require("./routes/uploadRoutes");
const appConfigs = require("./configs/appConfigs");

const app = express();
const PORT = appConfigs.port;

app.use(cors());
app.use("/api/uploads", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", uploadRoutes);

if (!module.parent) {
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
}

exports.default = app;
