const express = require("express");
const router = express.Router();
const { fetchExpenseReasonByUserID, addExpenseReason } = require("../services/ExpenseReasonService");
const { getPersonDataByUserId } = require("../services/PersonService");
const { addExpense, getExpenseDetailsByUserID } = require("../services/ExpenseService");

router
    .get("/getExpenseReason", async (request, response) => {
        try {
            let userID = request.session.userData["ID"];
            let queryData = await fetchExpenseReasonByUserID(userID)
            response.status(200).send({ "message": "Fetch Success", "data": queryData })
        } catch (error) {
            console.log(error.message);
            response.status(500).send(new Error("Duplicate entry for Bank ID"));
        }

    })
    .post("/addExpenseReason", async (request, response) => {
        response.status(200).send({ "message": "Add Success" });
    }).get("/getPersonData", async (request, response) => {
        try {
            let result = await getPersonDataByUserId(request.session.userData["ID"]);
            console.log(result);
            response.status(200).send({ "message": "Success", "data": result });
        } catch (error) {
            console.log(error.message);
            response.status(500).send(new Error("Duplicate entry for Bank ID"));
        }

    })
    .post("/addExpense", async (request, response) => {
        try {
            let expenseObj = {
                "bankName": request.body.bankName,
                "amount": request.body.amount,
                "date": request.body.date,
                "expenseReason": request.body.expenseReason,
                "spacialDebit": request.body.spacialDebit,
                "Notes": request.body.Notes,
                "userID": request.session.userData["ID"]
            }
            // console.log(expenseObj)
            await addExpense(expenseObj);
            response.status(200).send({ "message": "Add Success" });
        } catch (error) {
            console.log(error.message);
            response.status(500).send(new Error(error.message));
        }

    })
    .get("/getExpense", async (request,response) => {
        let expenseData = await getExpenseDetailsByUserID(request.session.userData["ID"]);
        response.status(200).send({ "message": "Success","data": expenseData });
    })
    .get("/getLendFromPersons", async (request,response) => {
        console.log("HIT");
        response.status(200).send({ "message": "Success" });

    })

module.exports = router;