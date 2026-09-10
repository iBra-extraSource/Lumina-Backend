const express = require("express");

const {
  savePrediction,
  getPredictions,
  getPredictionById,
} = require("../controllers/predictionController");

const router = express.Router();

router.post("/", savePrediction);

router.get("/", getPredictions);

router.get("/:id", getPredictionById);

module.exports = router;