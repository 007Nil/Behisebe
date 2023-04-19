const express = require("express");
const router = express.Router();

// Models

// const expenseModel = require("../model/ExpenseModel");
const lendModel = require("../model/LendModel");
const partialPaymentModel = require("../model/PartialPaymemnt");

// Servcies
const { savePartialPayment } = require("../services/PartialPaymemntService");
const { udpateLendTable, getPartialPayAmount } = require("../services/MoneyLendService");
const { addExpense } = require("../services/ExpenseService");

router
    .post("/payDebt", async (request, response) => {
        try {
            let userID = request.session.userData["ID"];
            let requestObj = request.body;
            // if (requestObj.fullPayment == 1){
            //     // No partialP
            // }
            // console.log(requestObj)

            let expenseData = {};



            // let expenseObj = new expenseModel();

            if (requestObj.bycash) {
                expenseData.bankId = null;
                expenseData.byCash = true;
            } else if (requestObj.debitedBankId) {
                expenseData.byCash = false;
                expenseData.bankId = requestObj.debitedBankId;
            }
            expenseData.userId = userID;
            expenseData.amount = requestObj.payAmount;
            expenseData.expenseReason = "1234567098"; //Pay Of Debt
            expenseData.notes = "Pay of Debt transaction";
            expenseData.date = requestObj.date;
            // Save the expense 
            await addExpense(expenseData);

            if (requestObj.fullPayment == 1) {
                // The no partial payment and we can close the borrow data 
            } else {
                // console.log("HIT FROM ELSE");
                // Its a partial payment
                let lendObj = new lendModel();
                let DbAmount = await getPartialPayAmount(requestObj.lendId);
                lendObj.id = requestObj.lendId;
                lendObj.fullPayment = 0;
                lendObj.partialAmount = parseInt(requestObj.payAmount) + parseInt(DbAmount);
                lendObj.paymentOnDate = requestObj.date;
                // Update lend data
                // console.log(lendObj)
                await udpateLendTable(lendObj);

                let pPaymentObj = new partialPaymentModel();
                pPaymentObj.amount = requestObj.payAmount;
                pPaymentObj.lendId = requestObj.lendId;
                if (requestObj.bycash) {
                    pPaymentObj.bankId = null;
                    pPaymentObj.bycash = 1;
                } else if (requestObj.debitedBankId) {
                    pPaymentObj.bankId = requestObj.debitedBankId;
                    pPaymentObj.bycash = 0;
                }
                pPaymentObj.onDate = requestObj.date;
                console.log(pPaymentObj)
                // Save partial payment data
                await savePartialPayment(pPaymentObj);
            }


            // let queryData = await fetchExpenseReasonByUserID(userID)
            response.status(200).send({ "message": "Fetch Success", "data": "TEST" })
        } catch (error) {
            console.log(error)
            response.status(200).send({ "error": "error", "data": "TEST" })
        }

    })

module.exports = router;