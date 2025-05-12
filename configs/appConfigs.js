require("dotenv").config();

module.exports = {
  appVersion: process.env.APP_VERSION,
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  logFile: process.env.LOG_FILE || "server.log",
  uploadDir: process.env.UPLOAD_DIR || "uploads",
  maxFileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024,
  allowedMimeTypes: process.env.ALLOWED_MIME_TYPES || [
    "image/jpeg",
    "image/png",
    "application/pdf",
  ],
};
