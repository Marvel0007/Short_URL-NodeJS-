const express = require("express");

const {
  handleUserSignup,
  handleUserLogin,
} = require("../controllers/user");

const router = express.Router();


// ==============================
// User Signup
// ==============================

router.post("/", handleUserSignup);


// ==============================
// User Login
// ==============================

router.post("/login", handleUserLogin);


module.exports = router;