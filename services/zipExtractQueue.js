const { Queue } = require('bullmq');
const connection = require('../configs/redisConfig');

/**
 * Menambahkan job ekstraksi ZIP ke queue
 * @param {string} zipPath - path file zip yang diupload
 * @param {string} extractDir - folder tujuan penyimpanan file hasil ekstraksi
 */

const extractQueue = new Queue('extract-queue', { connection });

exports.addExtractJob = async (zipPath, extractDir = 'uploads') => {
    await extractQueue.add('extract-zip', { zipPath, extractDir });
    console.log(`✅ Job ekstraksi ditambahkan ke queue: ${zipPath}`);
};
