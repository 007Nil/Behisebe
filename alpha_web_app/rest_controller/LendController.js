const express = require("express");
const router = express.Router();

// Models

const expenseModel = require("../model/ExpenseModel");
const creditModel = require("../model/CreditModel");
const lendModel = require("../model/LendModel");
const partialPaymentModel = require("../model/PartialPaymemnt");

// Servcies
const { savePartialPayment, getPartialPayment } = require("../services/PartialPaymemntService");
const { udpateLendTable, getPartialPayAmount } = require("../services/MoneyLendService");
const { addExpense, closeLend } = require("../services/ExpenseService");
const { closeBorrow, addCreditDetails } = require("../services/CreditServices");

router
    .post("/payDebt", async (request, response) => {
        try {

            let userID = request.session.userData["ID"];
            let requestObj = request.body;

            let expenseData = {};

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
            addExpense(expenseData);
            let lendObj = new lendModel();
            let pPaymentObj = new partialPaymentModel();
            if (requestObj.fullPayment == 1) {
                // The no partial payment and we can close the borrow data
                let creditObj = new creditModel();
                creditObj.id = requestObj.transacationId;
                creditObj.LendPaid = 1;
                closeBorrow(creditObj)
                let partialPaymentArray = await getPartialPayment(requestObj.lendId);

                if (partialPaymentArray.length == 0) {
                    // Direct payment
                    lendObj.id = requestObj.lendId
                    lendObj.fullPayment = 1;
                    lendObj.partialAmount = requestObj.borrowAmount;
                    lendObj.paymentOnDate = requestObj.date;
                    udpateLendTable(lendObj);
                } else {
                    // Save data in partial payment and the save lend
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
                    savePartialPayment(pPaymentObj);


                    lendObj.id = requestObj.lendId
                    lendObj.fullPayment = 1;
                    lendObj.partialAmount = requestObj.borrowAmount;
                    lendObj.paymentOnDate = requestObj.date;
                    udpateLendTable(lendObj);
                }
                // lendObj.

            } else {
                // console.log("HIT FROM ELSE");
                // Its a partial payment
                lendObj = new lendModel();
                let DbAmount = await getPartialPayAmount(requestObj.lendId);
                lendObj.id = requestObj.lendId;
                lendObj.fullPayment = 0;
                lendObj.partialAmount = parseInt(requestObj.payAmount) + parseInt(DbAmount);
                lendObj.paymentOnDate = requestObj.date;
                // Update lend data
                // console.log(lendObj)
                udpateLendTable(lendObj);


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
                // console.log(pPaymentObj)
                // Save partial payment data
                savePartialPayment(pPaymentObj);
            }


            // let queryData = await fetchExpenseReasonByUserID(userID)
            response.status(200).send({ "message": "Success", "data": "Data Saved" })
        } catch (error) {
            console.log(error)
            response.status(200).send({ "error": "error", "data": "Data Save Failed" })
        }

    })
    .post("/collectDebt", async (request, response) => {
        try {
            let userID = request.session.userData["ID"];
            let requestObj = request.body;

            let creaditData = {}

            if (requestObj.bycash) {
                creaditData.bankId = null;
                creaditData.byCash = true;
            } else if (requestObj.creditedBankId) {
                creaditData.bankId = requestObj.creditedBankId;
                creaditData.byCash = false;
            }
            creaditData.userId = userID;
            creaditData.reason = "098787651";
            creaditData.date = requestObj.date;
            creaditData.amount = requestObj.payAmount;
            creaditData.notes = "Collect Debt transaction";
            // Save credit data
            addCreditDetails(creaditData)

            let lendObj = new lendModel();
            let pPaymentObj = new partialPaymentModel();

            if (requestObj.fullPayment == 1) {
                let expenseObj = new expenseModel();

                expenseObj.id = requestObj.transacationId;
                expenseObj.lendClose = 1;
                closeLend(expenseObj);
                // Update expense data
                let partialPaymentArray = await getPartialPayment(requestObj.lendId);
                if (partialPaymentArray.length == 0) {
                    // Direct payment
                    lendObj.id = requestObj.lendId
                    lendObj.fullPayment = 1;
                    lendObj.partialAmount = requestObj.lendAmount;
                    lendObj.paymentOnDate = requestObj.date;
                    udpateLendTable(lendObj);
                } else {
                    // Save data in partial payment and the save lend
                    pPaymentObj.amount = requestObj.payAmount;
                    pPaymentObj.lendId = requestObj.lendId;
                    if (requestObj.bycash) {
                        pPaymentObj.bankId = null;
                        pPaymentObj.bycash = 1;
                    } else if (requestObj.creditedBankId) {
                        pPaymentObj.bankId = requestObj.creditedBankId;
                        pPaymentObj.bycash = 0;
                    }
                    pPaymentObj.onDate = requestObj.date;
                    savePartialPayment(pPaymentObj);


                    lendObj.id = requestObj.lendId
                    lendObj.fullPayment = 1;
                    lendObj.partialAmount = requestObj.lendAmount;
                    lendObj.paymentOnDate = requestObj.date;
                    udpateLendTable(lendObj);
                }
            } else {
                lendObj = new lendModel();
                let DbAmount = await getPartialPayAmount(requestObj.lendId);
                lendObj.id = requestObj.lendId;
                lendObj.fullPayment = 0;
                lendObj.partialAmount = parseInt(requestObj.payAmount) + parseInt(DbAmount);
                lendObj.paymentOnDate = requestObj.date;
                udpateLendTable(lendObj);

                pPaymentObj.amount = requestObj.payAmount;
                pPaymentObj.lendId = requestObj.lendId;
                if (requestObj.bycash) {
                    pPaymentObj.bankId = null;
                    pPaymentObj.bycash = 1;
                } else if (requestObj.creditedBankId) {
                    pPaymentObj.bankId = requestObj.creditedBankId;
                    pPaymentObj.bycash = 0;
                }
                pPaymentObj.onDate = requestObj.date;

                savePartialPayment(pPaymentObj);
            }
            response.status(200).send({ "message": "Success", "data": "Data Saved" })
        } catch {
            console.log(error)
            response.status(200).send({ "error": "error", "data": "Data Save Failed" })
        }
    });

module.exports = router;