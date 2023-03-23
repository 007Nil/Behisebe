const express = require("express");
const router = express.Router();
const {findUserByEmail} = require("../services/UserServices")
// const User = require("../model/UserModel");

router.get("/login",async (req, res) => {
    // This is for testing only
    // 
    // session.userEmail = "sagniksarkar@ymail.com";
    // let userObject = await findUserByEmail("sagniksarkar@ymail.com");
    // let session = req.session;
    // session.userData = userObject[0];
    // console.log(userObject[0]);
    // let user = new User();
    // console.log(user);
    res.redirect('/transaction/expense');
});

module.exports = router;