const express = require("express");
const router = express.Router();
const {findUserByEmail} = require("../services/UserServices")

router.get("/login",async (req, res) => {
    // This is for testing only
    // 
    // session.userEmail = "sagniksarkar@ymail.com";
    // let userObject = await findUserByEmail("sagniksarkar@ymail.com");
    // let session = req.session;
    // session.userData = userObject[0];
    // console.log(userObject[0]);
    res.redirect('/dashboard');
});

module.exports = router;