const pool = require("../config/db");

async function addPatient(req, res) {
  try {
    const {
      clinic_id,
      full_name,
      email,
      phone,
      date_of_birth,
      gender,
      procedure_interest,
      consultation_notes,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO patients
      (
        clinic_id,
        full_name,
        email,
        phone,
        date_of_birth,
        gender,
        procedure_interest,
        consultation_notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        clinic_id,
        full_name,
        email,
        phone,
        date_of_birth,
        gender,
        procedure_interest,
        consultation_notes,
      ]
    );

    res.status(201).json({
      message: "Patient added successfully",
      patient: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add patient",
    });
  }
}

async function getPatients(req, res) {
  try {
    const { clinic_id } = req.query;

    const result = await pool.query(
      `SELECT *
       FROM patients
       WHERE clinic_id = $1
       ORDER BY created_at DESC`,
      [clinic_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get patients",
    });
  }
}

async function getPatientById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM patients WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get patient",
    });
  }
}

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
};