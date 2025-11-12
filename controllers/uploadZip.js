const { StatusCodes } = require('http-status-codes');
const { addExtractJob } = require('../services/zipExtractQueue');
const logger = require('../utils/logger');
const path = require('path');

exports.uploadZip = async (req, res) => {
    try {
        if (!req.file) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'Tidak ada file ZIP yang diupload' });
        }

        const zipPath = path.resolve(req.file.path);
        await addExtractJob(zipPath, 'uploads');

        res.json({ message: 'Upload dan ekstraksi berhasil!' });
    } catch (error) {
        logger.error(`[UploadZipController]: ${error.message}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Terjadi kesalahan saat memproses file ZIP',
        });
    }
};
