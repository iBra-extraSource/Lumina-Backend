const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./routes/userRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const patientRoutes = require("./routes/patientRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/uploads", uploadRoutes);
app.get("/", (req, res) => {
  res.send("Lumina backend is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});