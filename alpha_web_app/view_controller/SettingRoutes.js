const express = require("express");
const router = express.Router();

router.get("/bank_settings", function (req, res) {
  // let sessionData = req.session;
  // console.log(sessionData.userEmail);
  res.locals.firstName = req.session.user.firstName;
  res.locals.lastName = req.session.user.lastName;
  res.render("settings/bank-settings",{"title": "Bank Settings"});
});

module.exports = router;