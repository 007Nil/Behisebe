const express = require("express");
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
  let userDetails = req.session.passport.user;
  console.log(userDetails)
  if (userDetails.newUser) {
    if (userDetails.email == process.env.USER_EMAIL) {
      res.redirect("/transaction/add-initial-cash");
      return;
    } else {
      res.send(
        "THIS IS A ALPHA TESTING APPLICATION. REGISTRATION IS NOT VALID FOR REGULAR USERS"
      );
      return;
    }
  }
  res.render("dashboard/dashboard", { title: "Dashboard" });
});

module.exports = router;
