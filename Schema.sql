CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(150) UNIQUE NOT NULL,
    gender VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM users;

CREATE TABLE clinics (
    id SERIAL PRIMARY KEY,
    clinic_name VARCHAR(150) NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(30),
    specialization VARCHAR(100),
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from clinics;

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    clinic_id INTEGER REFERENCES clinics(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(30),
    date_of_birth DATE,
    gender VARCHAR(20),
    procedure_interest VARCHAR(100),
    consultation_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from patients;

CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    clinic_id INTEGER REFERENCES clinics(id) ON DELETE CASCADE,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,

    procedure VARCHAR(100) NOT NULL,

    original_image TEXT,
    generated_image TEXT,

    doctor_notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from predictions;

