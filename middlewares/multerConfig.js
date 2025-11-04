const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');

const appConfigs = require('../configs/appConfigs');
const ResponseData = require('../utils/response');
const logger = require('../utils/logger');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appConfigs.uploadDir);
    },
    filename: (req, file, cb) => {
        //  crypto.randomBytes(16).toString('hex');
        const safeName = Date.now();
        const baseName = path.basename(file.originalname, path.extname(file.originalname));

        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, baseName + '-' + safeName + ext);
    },
});

const fileFilter = (req, file, cb) => {
    if (appConfigs.allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const message = `Blocked upload: Unsupported MIME type ${file.mimetype}`;
        logger.warn(message);
        cb(new Error('Invalid file type'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: appConfigs.maxFileSize },
    fileFilter,
}).single('file');

exports.uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            const message = `Multer error: ${err.message}`;
            logger.error(message);
            return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message));
        } else if (err) {
            const message = `Upload failed: ${err.message}`;
            logger.error(message);
            return res.status(StatusCodes.UNSUPPORTED_MEDIA_TYPE).json(ResponseData.error(message));
        }
        next();
    });
};
