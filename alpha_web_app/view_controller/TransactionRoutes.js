const express = require("express");
const router = express.Router();

router
.get("/expense", function (req, res) {
  res.render("transaction/expense-form",{"title": "Expense Section"});
})
.get("/expense/add-expense", function (req, res) {
  res.render("transaction/expense/add-expense",{"title": "Add Expense"});
})

.get("/expense/view-bank-expense", function (req, res) {
  res.render("transaction/expense/view-bank-expense",{"title": "View Bank Expense"});
})
.get("/expense/view-cash-expense", function (req, res) {
  res.render("transaction/expense/view-cash-expense",{"title": "View Cash Expense"});
})
// .get("/credit", (request,response) =>{
//   response.render("transaction/credit-form",{"title": "Credit Section"});
// })
// credit/add-expense
.get("/credit/add-expense", (request,response) =>{
  response.render("transaction/credit/add-credit",{"title": "Credit Section"});
})
.get("/pay-your-debts",(request,response) => {
  response.render("transaction/pay-your-debt",{"title": "Pay Your Debts"});
})
.get("/collect-your-debts", (request,response) => {
  response.render("transaction/collect-your-debt",{"title": "Collect Your Debts"});
});

module.exports = router;