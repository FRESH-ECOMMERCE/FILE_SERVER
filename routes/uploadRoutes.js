const express = require("express");
const { uploadFile } = require("../controllers/uploadFileController");
const { deleteFile } = require("../controllers/deleteFileController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { uploadMiddleware } = require("../middlewares/multerConfig");

const router = express.Router();

router.post("/upload", authenticateToken, uploadMiddleware, uploadFile);
router.delete("/upload/:filename", authenticateToken, deleteFile);

module.exports = router;
