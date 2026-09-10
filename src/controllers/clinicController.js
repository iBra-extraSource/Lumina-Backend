const pool = require("../config/db");

async function registerClinic(req, res) {
  try {
    const {
      clinic_name,
      doctor_name,
      email,
      phone,
      specialization,
      address,
      password,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO clinics
      (clinic_name, doctor_name, email, phone, specialization, address, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, clinic_name, doctor_name, email, phone, specialization, address, created_at`,
      [
        clinic_name,
        doctor_name,
        email,
        phone,
        specialization,
        address,
        password,
      ]
    );

    res.status(201).json({
      message: "Clinic registered successfully",
      clinic: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Clinic registration failed",
    });
  }
}

async function loginClinic(req, res) {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM clinics WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Clinic not found",
      });
    }

    const clinic = result.rows[0];

    if (clinic.password !== password) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    res.json({
      message: "Login successful",
      clinic: {
        id: clinic.id,
        clinic_name: clinic.clinic_name,
        doctor_name: clinic.doctor_name,
        email: clinic.email,
        phone: clinic.phone,
        specialization: clinic.specialization,
        address: clinic.address,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Clinic login failed",
    });
  }
}

async function getClinicById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        id,
        clinic_name,
        doctor_name,
        email,
        phone,
        specialization,
        address,
        created_at
       FROM clinics
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Clinic not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get clinic",
    });
  }
}

module.exports = {
  registerClinic,
  loginClinic,
  getClinicById,
};