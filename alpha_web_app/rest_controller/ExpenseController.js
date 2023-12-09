const express = require("express");
const router = express.Router();
const { fetchExpenseReasonByUserID, addExpenseReason } = require("../services/ExpenseReasonService");
const { addExpense, getExpenseDetailsByuserId, getCashExpenseDetailsByUserId } = require("../services/ExpenseService");
const { getLendFromData } = require("../services/MoneyLendService");


router
    .get("/getExpenseReason", async (request, response) => {
        try {
            let userID = request.session.passport.user["ID"];
            let queryData = await fetchExpenseReasonByUserID(userID)
            response.status(200).send({ "message": "Fetch Success", "data": queryData })
        } catch (error) {
            console.log(error.message);
            response.status(500).send(new Error("Duplicate entry for Bank ID"));
        }

    })
    .post("/addExpense", async (request, response) => {

        try {
            request.body.userId = request.session.passport.user["ID"];
            await addExpense(request.body);
            response.status(200).send({ "message": "Add Success" });
        } catch (error) {
            console.log(error);
            response.status(500).send(new Error(error.message));
        }

    })
    .get("/getExpense", async (request, response) => {
        try {
            let requestObj = request.query
            // console.log(requestObj);
            requestObj.userId = request.session.passport.user["ID"];
            // let expenseData = await getExpenseDetailsByuserId(request.session.passport.user["ID"]);
            let expenseData = await getExpenseDetailsByuserId(requestObj);
            response.status(200).send({ "message": "Success", "data": expenseData });
        } catch (error) {
            console.log(error);
            response.status(500).send({ "message": "Error", "data": new Error(error.message) });
        }
    })
    .get("/getPayOfDebt", async (request, response) => {
        try {
            console.log(request.session)
            let lendFromData = await getLendFromData(request.session.passport.user["ID"]);
            response.status(200).send({ "message": "Success", "data": lendFromData });
        } catch (error) {
            console.log(error);
            response.status(500).send(new Error(error.message));
        }

    })
    .get("/getCashExpense", async (request, response) => {
        // console.log("HIT");
        let requestBody = request.query;
        requestBody.userId = request.session.passport.user["ID"];
        let cashExpense =  await getCashExpenseDetailsByUserId(requestBody);
        response.status(200).send({ "message": "successful","data": cashExpense });
    })
module.exports = router;