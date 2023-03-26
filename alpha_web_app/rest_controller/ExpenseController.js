const express = require("express");
const router = express.Router();
const { fetchExpenseReasonByUserID, addExpenseReason } = require("../services/ExpenseReasonService");
const { getPersonDataByUserId } = require("../services/PersonService");
const { addExpense } = require("../services/ExpenseService");
const { getLendFromData } = require("../services/MoneyLendService");

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
            // console.log(result);
            response.status(200).send({ "message": "Success", "data": result });
        } catch (error) {
            console.log(error.message);
            response.status(500).send(new Error("Duplicate entry for Bank ID"));
        }

    })
    .post("/addExpense", async (request, response) => {

        try {
            request.body.userId = request.session.userData["ID"];
            await addExpense(request.body);
            response.status(200).send({ "message": "Add Success" });
        } catch (error) {
            console.log(error);
            response.status(500).send(new Error(error.message));
        }

    })
    .get("/getExpense", async (request, response) => {
        let expenseData = await getExpenseDetailsByUserID(request.session.userData["ID"]);
        response.status(200).send({ "message": "Success", "data": expenseData });
    })
    .get("/getPayOfDebt", async (request, response) => {
        try {
            let lendFromData = await getLendFromData(request.session.userData["ID"]);
            response.status(200).send({ "message": "Success", "data":  lendFromData});
        } catch (error) {
            console.log(error);
            response.status(500).send(new Error(error.message));
        }

    })

module.exports = router;