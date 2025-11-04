const express = require('express');
const { uploadFile } = require('../controllers/uploadFileController');
const { deleteFile } = require('../controllers/deleteFileController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { uploadMiddleware } = require('../middlewares/multerConfig');
const { main } = require('../controllers/index');
const { healthCheck } = require('../controllers/health');
const { findAll } = require('../controllers/findAll');

const router = express.Router();

router.get('/', main);
router.get('/health', healthCheck);
router.get('/uploads', findAll);
router.post('/uploads', authenticateToken, uploadMiddleware, uploadFile);
router.delete('/uploads/:filename', authenticateToken, deleteFile);

module.exports = router;
