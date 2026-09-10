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

async function getPredictions(req, res) {
  try {
    const {
      user_id,
      clinic_id,
      patient_id,
    } = req.query;

    let query = `
      SELECT *
      FROM predictions
    `;

    let values = [];

    if (user_id) {
      query += " WHERE user_id = $1";
      values = [user_id];
    } else if (patient_id) {
      query += " WHERE patient_id = $1";
      values = [patient_id];
    } else if (clinic_id) {
      query += " WHERE clinic_id = $1";
      values = [clinic_id];
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get predictions",
    });
  }
}

async function getPredictionById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM predictions WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Prediction not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get prediction",
    });
  }
}

module.exports = {
  savePrediction,
  getPredictions,
  getPredictionById,
};