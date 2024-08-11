const express = require("express");

var router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/apps/behisebe/login");
});

// Login route
router.get("/login", function (req, res) {
    res.render("login");
})
// Signup route

module.exports = router;