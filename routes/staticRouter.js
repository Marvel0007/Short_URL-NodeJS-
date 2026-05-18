const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();


// ==============================
// Admin Routes
// ==============================

router.get(
  "/admin/urls",
  restrictTo(["ADMIN"]),
  async (req, res) => {
    try {
      const allurls = await URL.find({});

      return res.render("home", {
        urls: allurls,
      });

    } catch (error) {
      console.log("Admin Route Error:", error);

      return res.status(500).send("Internal Server Error");
    }
  }
);


// ==============================
// User Dashboard
// ==============================

router.get(
  "/",
  restrictTo(["NORMAL", "ADMIN"]),
  async (req, res) => {
    try {
      const allurls = await URL.find({
        createdBy: req.user._id,
      });

      return res.render("home", {
        urls: allurls,
      });

    } catch (error) {
      console.log("Home Route Error:", error);

      return res.status(500).send("Internal Server Error");
    }
  }
);


// ==============================
// Authentication Routes
// ==============================

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});


// ==============================
// Logout Route
// ==============================

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  return res.redirect("/login");
});


module.exports = router;