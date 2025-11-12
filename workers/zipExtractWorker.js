const { Worker } = require('bullmq');
const { ExtractZipImagesService } = require('../services/zipService');

const connection = require('../configs/redisConfig');

const worker = new Worker(
    'extract-queue',
    async (job) => {
        const { zipPath, extractDir } = job.data;
        console.log(`🔧 Memproses job: ${zipPath}`);
        const result = await ExtractZipImagesService(zipPath, extractDir);
        console.log(`✅ Ekstraksi selesai: ${result.length} file`);
        return result;
    },
    { connection }
);

worker.on('ready', () => console.log('worker is running'));

worker.on('completed', (job) => {
    console.log(`🎉 Job selesai: ${job.id}`);
});

worker.on('failed', (job, err) => {
    console.error(`❌ Job gagal: ${job.id}`, err);
});
