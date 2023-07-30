const express = require("express");
const router = express.Router();
const { addExpense } = require("../services/ExpenseService");
const { addCreditDetails } = require("../services/CreditServices");

router.post("/add-self", async (req, res) => {
    try {
        let requestObj = req.body;
        requestObj.userId = req.session.passport.user["ID"];
        let expense_model = {
            "userId": requestObj.userId,
            "bankId": requestObj.transfer_from_id,
            "amount": requestObj.amount,
            "date": requestObj.date,
            "expenseReason": "1098856458",
            "spacialDebit": null,
            "byCash": false,
            "notes": `Transfer to ${requestObj.transfer_to_name}`
        };

        let credit_model = {
            "userId": requestObj.userId,
            "bankId": requestObj.transfer_to_id,
            "amount": requestObj.amount,
            "date": requestObj.date,
            "reason": "1698898645",
            "spacialCreditID": null,
            "byCash": false,
            "notes": `Transfer from ${requestObj.transfer_from_name}`
        }


        await addExpense(expense_model);
        await addCreditDetails(credit_model);
        res.status(200).send({ "message": "Success", "data": "domo_data" });

    } catch (error) {
        res.status(500).send(new Error(error.message));
    }
});

module.exports = router;