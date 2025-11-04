const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const ResponseData = require('../utils/response');
const appConfigs = require('../configs/appConfigs');
const logger = require('../utils/logger');
const { FileStorage } = require('../models');

exports.deleteFile = async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(appConfigs.uploadDir, filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);

            await FileStorage.destroy({ where: { name: filename } });
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
