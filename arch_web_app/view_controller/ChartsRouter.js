const express = require("express");
const router = express.Router();

router.get("/expense-pic-chart",async (req, res) => {
    res.render("charts/expense_pic_chart", { "title": "Expense  Pic Chart" });
});

module.exports = router;