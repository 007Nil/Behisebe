const express = require("express");
const router = express.Router();


router.get("/",async (req, res) => {
    if( req.session.passport.user.NewUser){
        res.redirect("/transaction/add-initial-cash");
    }
    res.render("dashboard/dashboard", { "title": "Dashboard" });
});

module.exports = router;