const express = require("express");
const router = express.Router();

router.get("/bank_settings", function (req, res) {
  res.render("settings/BankSettings");
});

module.exports = router;