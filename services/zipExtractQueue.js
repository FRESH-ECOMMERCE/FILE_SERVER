const { Queue } = require('bullmq');
const connection = require('../configs/redisConfig');
const logger = require('../utils/logger');

/**
 * Menambahkan job ekstraksi ZIP ke queue
 * @param {string} zipPath - path file zip yang diupload
 * @param {string} extractDir - folder tujuan penyimpanan file hasil ekstraksi
 */

const extractQueue = new Queue('extract-queue', { connection });

exports.addExtractJob = async (zipPath, extractDir = 'uploads') => {
    await extractQueue.add('extract-zip', { zipPath, extractDir });
    logger.info(`[QueueService]-Job ekstraksi ditambahkan ke queue: ${zipPath}`);
};
