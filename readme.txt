medimate-backend/
├── controllers/                # All logic/handlers for routes
│   ├── authController.js
│   ├── clinicController.js
│   ├── reminderController.js
│   ├── reportController.js
│   └── symptomController.js
│
├── middleware/                 # Middlewares like auth, file upload
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models/                     # Mongoose schema models
│   ├── User.js
│   ├── MedicalReport.js
│   ├── MedicineReminder.js
│   ├── SymptomAnalysis.js
│   └── NearbyClinic.js
│
├── routes/                     # Express route definitions
│   ├── authRoutes.js
│   ├── clinicRoutes.js
│   ├── reminderRoutes.js
│   ├── reportRoutes.js
│   └── symptomRoutes.js
│
├── uploads/                    # Stores uploaded medical report files (PDFs/images)
│
├── .env                        # Environment variables (JWT secret, Mongo URI)
├── server.js                   # Entry point (Express app + MongoDB connect)
├── package.json
└── README.md                   # (Optional) Project setup instructions




medimate-frontend/
├── public/
├── src/
│   ├── components/          # Reusable UI parts
│   ├── pages/               # Page-level components (Login, Dashboard, etc.)
│   ├── services/            # Axios API calls
│   ├── context/             # Auth/token context (optional)
│   ├── App.js
│   └── index.js
