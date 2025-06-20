// middlewares/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory for Firebase upload

const upload = multer({ storage });

module.exports = upload;
