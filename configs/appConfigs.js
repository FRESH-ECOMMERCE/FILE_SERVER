require('dotenv').config();

module.exports = {
    appVersion: process.env.APP_VERSION,
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY,
    logFile: process.env.LOG_FILE || 'server.log',
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024,
    allowedMimeTypes: process.env.ALLOWED_MIME_TYPES || [
        'image/jpeg',
        'image/png',
        'application/pdf',
    ],
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME || 'fresh_storage',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        dialect: 'mysql',
    },
};
