const express = require("express");
const router = express.Router();


router.get("/",async (req, res) => {
    // try{

    // }catch (error){
        
    // }
    if( req.session.passport.user.NewUser){
	    // res.redirect("/transaction/add-initial-cash");
	    res.send("THIS IS A ALPHA TESTING APPLICATION. REGISTRATION IS NOT VALID FOR REGULAR USERS")
    }
    res.render("dashboard/dashboard", { "title": "Dashboard" });
});

module.exports = router;
