const pool = require("../config/db");

async function savePrediction(req, res) {
  try {
    const {
      user_id,
      clinic_id,
      patient_id,
      procedure,
      original_image,
      generated_image,
      doctor_notes,
    } = req.body;

    if (!procedure) {
      return res.status(400).json({
        message: "Procedure is required",
      });
    }

    const result = await pool.query(
      `INSERT INTO predictions
      (
        user_id,
        clinic_id,
        patient_id,
        procedure,
        original_image,
        generated_image,
        doctor_notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        user_id || null,
        clinic_id || null,
        patient_id || null,
        procedure,
        original_image || null,
        generated_image || null,
        doctor_notes || null,
      ]
    );

    res.status(201).json({
      message: "Prediction saved successfully",
      prediction: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save prediction",
    });
  }
}

module.exports = {
  savePrediction,
};