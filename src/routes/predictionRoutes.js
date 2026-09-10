const express = require("express");

const {
  savePrediction,
} = require("../controllers/predictionController");

const router = express.Router();

router.post("/", savePrediction);

module.exports = router;