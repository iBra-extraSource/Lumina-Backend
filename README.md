# Lumina Aesthetics - Backend

Lumina Aesthetics is a full-stack cosmetic consultation platform that allows users and clinics to manage accounts, patients, prediction history, and AI-generated cosmetic previews.

This repository contains the backend of the application.

The backend is built using Node.js and Express.js and uses PostgreSQL as the database. It also integrates with the OpenAI API to generate AI-based cosmetic consultation previews from uploaded facial images.

---

## Backend Responsibilities

The backend is responsible for:

- Receiving requests from the React frontend
- Handling users and clinics
- Managing patient data
- Reading and writing data in PostgreSQL
- Supporting CRUD operations
- Uploading facial images
- Sending image-generation requests to OpenAI
- Saving AI prediction results
- Returning JSON responses to the frontend
- Handling errors
- Keeping sensitive API keys on the server side

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- `pg`
- `cors`
- `dotenv`
- `multer`
- `openai`
- `nodemon`

---

## Project Structure

```text
lumina-backend/
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── clinicController.js
│   │   ├── patientController.js
│   │   ├── predictionController.js
│   │   └── aiController.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── clinicRoutes.js
│   │   ├── patientRoutes.js
│   │   ├── predictionRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── aiRoutes.js
│   │
│   └── server.js
│
├── uploads/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md