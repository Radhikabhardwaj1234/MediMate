let express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
let PORT = 3000;
const cors = require("cors");
dotenv.config();


mongoose
  .connect("mongodb://localhost:27017/medimate")
  .then(() => console.log("Mongo Database Connected"))
  .catch((err)=> console.log("Error in connection!"));

app.use(cors());           // Allows React frontend to access the API
// app.use(helmet());         // Adds security headers to responses
app.use(express.json());   // Parses JSON data in request bodies

// app.get('/', function(req,res){
//   res.send("HEllo");
// })

// @created on 3-7-25

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// @created on 4-7-25
const symptomRoutes = require("./routes/symptomRoutes");
app.use("/api/symptoms", symptomRoutes);

// @created on 7-7-25

const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

// Serve static files from /uploads
app.use("/uploads", express.static("uploads"));



// @created on 9-7-25
const reminderRoutes = require("./routes/reminderRoutes");
app.use("/api/reminders", reminderRoutes);

// @created on 16-7-25
require("./utils/reminderScheduler");

app.listen(PORT , () => {
    console.log("Application is runniing on 3000");
})
