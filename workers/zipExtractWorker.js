const { Worker } = require('bullmq');
const { ExtractZipImagesService } = require('../services/zipService');
const logger = require('../utils/logger');

const connection = require('../configs/redisConfig');

const worker = new Worker(
    'extract-queue',
    async (job) => {
        const { zipPath, extractDir } = job.data;
        logger.info(`[Worker]-Memproses job: ${zipPath}`);
        const result = await ExtractZipImagesService(zipPath, extractDir);
        logger.info(`[Worker]-Ekstraksi selesai: ${result.length} file`);
    },
    { connection }
);

worker.on('ready', () => console.log('worker is running'));

worker.on('completed', (job) => {
    logger.info(`[Worker]-Job selesai: ${job.id}`);
});

worker.on('failed', (job, err) => {
    logger.error(`[Worker]-Job gagal: ${job.id}`, err);
});
