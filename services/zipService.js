const fs = require('fs-extra');
const AdmZip = require('adm-zip');
const path = require('path');

/**
 * Mengekstrak file zip dan menyimpan file gambar ke folder tujuan
 * @param {string} zipPath - path file zip yang diupload
 * @param {string} extractDir - folder tujuan penyimpanan file hasil ekstraksi
 * @returns {Promise<string[]>} daftar nama file yang berhasil disimpan
 */
exports.ExtractZipImagesService = async function (zipPath, extractDir = 'uploads') {
    await fs.ensureDir(extractDir);

    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();

    const savedFiles = [];

    for (const entry of zipEntries) {
        if (entry.isDirectory) continue;

        const ext = path.extname(entry.entryName).toLowerCase();
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

        let fileName = path.basename(entry.entryName);
        let targetPath = path.join(extractDir, fileName);

        if (fileName.startsWith('._')) continue;

        if (await fs.pathExists(targetPath)) {
            const nameWithoutExt = path.basename(fileName, ext);

            const newName = `${nameWithoutExt}_${Date.now()}${ext}`;
            targetPath = path.join(extractDir, newName);
            fileName = newName;
        }

        const fileData = entry.getData();
        await fs.writeFile(targetPath, fileData);

        savedFiles.push(fileName);
    }

    await fs.remove(zipPath);

    console.log('Saved files');
    console.log(savedFiles);
    return savedFiles;
};
