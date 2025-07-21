// @created on  3-7-25
const express = require("express");
const router = express.Router();
const { registerUser,loginUser } = require("../controller/authController");

// @route   POST /api/auth/register

router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
