const pool = require("../config/db");

async function registerUser(req, res) {
  try {
    const {
      full_name,
      date_of_birth,
      email,
      gender,
      password,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO users
      (full_name, date_of_birth, email, gender, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, full_name, email, gender, created_at`,
      [
        full_name,
        date_of_birth,
        email,
        gender,
        password,
      ]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "User registration failed",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
};