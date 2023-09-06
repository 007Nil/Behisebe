const express = require("express");
const router = express.Router();
const {findUserByEmail} = require("../services/UserServices")
// const User = require("../model/UserModel");

router.get("/",async (req, res) => {
    res.render("Login")
});

module.exports = router;