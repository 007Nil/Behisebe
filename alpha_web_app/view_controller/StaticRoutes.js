const express = require("express");
const router = express.Router();

router.get("/dashboard", function (req, res) {
  // console.log(sessionData.userData["ID"]);
  // console.log(req.session.userData["ID"]);
  res.render("expense-form",{"title": "Expense Form"});
});

module.exports = router;