// controllers/productController.js
const { db, bucket } = require("../firebase");
const { v4: uuidv4 } = require("uuid");

exports.uploadProduct = async (req, res) => {
  try {
    const { name, description, mobile, price, category } = req.body;
    const file = req.file;

    if (!file) return res.status(400).send("Product image is required.");

    const filename = `${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(filename);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
      },
    });

    blobStream.on("error", (error) => {
      console.error(error);
      res.status(500).send("Image upload failed");
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media&token=${fileUpload.metadata.metadata.firebaseStorageDownloadTokens}`;

      const newProduct = {
        name,
        description,
        mobile,
        price,
        category,
        imageUrl: publicUrl,
        createdAt: new Date(),
      };

      await db.collection("products").add(newProduct);
      res.status(200).send("Product uploaded successfully");
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).send("Error uploading product: " + error.message);
  }
};
