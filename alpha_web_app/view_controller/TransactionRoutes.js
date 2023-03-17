const express = require("express");
const router = express.Router();

router
.get("/expense", function (req, res) {
  // console.log(sessionData.userData["ID"]);
  // console.log(req.session.userData["ID"]);
  res.render("transaction/expense-form",{"title": "Expense Section"});
})
.get("/credit", (request,response) =>{
  response.render("transaction/credit-form",{"title": "Credit Section"});
});

module.exports = router;