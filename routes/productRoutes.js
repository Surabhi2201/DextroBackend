// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { uploadProduct } = require("../controller/productController");

router.post("/upload", upload.single("productImage"), uploadProduct);

module.exports = router;
