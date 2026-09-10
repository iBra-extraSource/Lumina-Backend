const express = require("express");
const multer = require("multer");

const {
  generatePrediction,
} = require("../controllers/aiController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG and WebP images are allowed"));
    }
  },
});

router.post(
  "/prediction",
  upload.single("image"),
  generatePrediction
);

module.exports = router;