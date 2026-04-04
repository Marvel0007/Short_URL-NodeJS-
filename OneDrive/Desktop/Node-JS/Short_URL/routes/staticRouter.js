const express = require('express');
const URL = require("../models/url");
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Admin-only
router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", { urls: allurls });
});

// Home (Logged-in users only)
router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
    try {
        const allurls = await URL.find({ createdBy: req.user._id });
        return res.render("home", { urls: allurls });
    } catch (err) {
        return res.status(500).send("Server Error");
    }
});

// Public routes
router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
