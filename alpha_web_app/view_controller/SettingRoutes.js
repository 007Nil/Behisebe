const express = require("express");
const router = express.Router();

router.get("/bank_settings", function (req, res) {
  // let sessionData = req.session;
  // console.log(sessionData.userEmail);
  res.render("settings/bank-settings",{"title": "Bank Settings"});
});

module.exports = router;