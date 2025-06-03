const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

router.post("/upload", upload.single("profileImage"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
