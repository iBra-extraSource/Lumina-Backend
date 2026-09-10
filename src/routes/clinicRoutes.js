const express = require("express");

const {
  registerClinic,
  loginClinic,
  getClinicById,
} = require("../controllers/clinicController");

const router = express.Router();

router.post("/signup", registerClinic);
router.post("/login", loginClinic);
router.get("/:id", getClinicById);

module.exports = router;