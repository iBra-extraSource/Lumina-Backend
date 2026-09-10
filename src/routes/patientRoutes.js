const express = require("express");

const {
  addPatient,
  getPatients,
  getPatientById,
} = require("../controllers/patientController");

const router = express.Router();

router.post("/", addPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);

module.exports = router;