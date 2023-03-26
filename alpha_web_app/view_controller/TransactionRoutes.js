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
})
.get("/pay-your-debts",(request,response) => {
  response.render("transaction/pay-your-debt",{"title": "Pay Your Debts"});
})
.get("/collect-your-debts", (request,response) => {
  response.render("transaction/collect-your-debt",{"title": "Collect Your Debts"});
});

module.exports = router;