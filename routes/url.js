const express = require("express");

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();


// ==============================
// Generate Short URL
// ==============================

router.post("/", handleGenerateNewShortURL);


// ==============================
// URL Analytics
// ==============================

router.get("/analytics/:shortId", handleGetAnalytics);


module.exports = router;