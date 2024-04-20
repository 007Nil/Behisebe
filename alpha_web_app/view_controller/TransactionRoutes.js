const express = require("express");
const router = express.Router();

router
  .get("/expense", function (req, res) {
    res.render("transaction/expense-form", { "title": "Expense Section" });
  })
  .get("/expense/add-expense", function (req, res) {
    res.render("transaction/expense/add-expense", { "title": "Add Expense" });
  })

  .get("/expense/view-bank-expense", function (req, res) {
    res.render("transaction/expense/view-bank-expense", { "title": "View Bank Expense" });
  })
  .get("/expense/view-cash-expense", function (req, res) {
    res.render("transaction/expense/view-cash-expense", { "title": "View Cash Expense" });
  })
  .get("/credit/add-credit", (req, res) => {
    res.render("transaction/credit/add-credit", { "title": "Add Credit" });
  })
  .get("/credit/view-bank-credit", (req, res) => {
    res.render("transaction/credit/view-bank-credit", { "title": "View Bank Credit" });
  })
  .get("/credit/view-cash-credit", (req, res) => {
    res.render("transaction/credit/view-cash-credit", { "title": "View Cash Credit" });
  })
  .get("/pay-your-debts", (req, res) => {
    res.render("transaction/pay-your-debt", { "title": "Pay Your Debts" });
  })
  .get("/collect-your-debts", (req, res) => {
    res.render("transaction/collect-your-debt", { "title": "Collect Your Debts" });
  })
  .get("/add-initial-cash", (req, res) => {
    res.render("transaction/credit/add-initial-cash");
  })
  .get("/self-transfer", (req,res) => {
    res.render("transaction/self-transfer", {"title": "Self Transfer"});
  });

module.exports = router;