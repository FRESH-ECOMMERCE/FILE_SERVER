const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const ResponseData = require('../utils/response');
const appConfigs = require('../configs/appConfigs');
const logger = require('../utils/logger');

exports.deleteFile = (req, res) => {
    try {
        console.log('1SDsd');

        const { filename } = req.params;
        const filePath = path.join(appConfigs.uploadDir, filename);

        console.log('SDsd');

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info(`File deleted: ${filename}`);
        }

        return res
            .status(StatusCodes.OK)
            .json(ResponseData.success('File deleted successfully', { filename }));
    } catch (error) {
        logger.error(`Delete failed: ${error.message}`);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ResponseData.error('Internal server error'));
    }
};
