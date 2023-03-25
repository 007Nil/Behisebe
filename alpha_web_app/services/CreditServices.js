const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");
const crypto = require("crypto");
const { getCreditReason, addCreditReason } = require("./CreditReasonService");
const { getPersonDataByUserId, addPersonData, getPersonNamebyID } = require("./PersonService");
const { addLendDetails, getLendByID } = require("./MoneyLendService");

//  Repo
const creditRepo = require("../repository/CreditRepo");
// Models
const LendModel = require("../model/LendModel");
const PersonModel = require("../model/PersonModel");
const CreditReasonModel = require("../model/CreditReasonModel");

async function addCreditDetails(creditObj) {

    creditObj.creditId = crypto.randomBytes(10).toString("hex");
    let userID = creditObj.userId;
    let creditReasonResult = await getCreditReason(userID);


    let creditResult = creditReasonResult.map(each => each.ID);

    if (!creditResult.includes(creditObj.reason)) {
        // Find new reason, So save the data
        let creditReasonObj = new CreditReasonModel();
        creditReasonObj.reason = creditObj.reason;
        creditReasonObj.userId = userID;

        creditObj.reason = await addCreditReason(creditReasonObj);
    }

    // Spacial Credit Logic
    if (creditObj.spacialCreditID) {
        let lendObj = new LendModel();
        let getPersonDetails = await getPersonDataByUserId(userID);
        let personID = getPersonDetails.map(each => each.ID);
        //  I lend some momey from someone
        if ((creditObj.spacialCreditID).split("-")[1] === "lendMoney") {
            if (!personID.includes((creditObj.spacialCreditID).split("-")[0])) {
                let personObj = new PersonModel();
                personObj.name = (creditObj.spacialCreditID).split("-")[0];
                personObj.userId = userID;

                lendObj.lendFrom = await addPersonData(personObj);
                lendObj.lendTo = null;
            } else {
                // We hve the person in DB
                lendObj.lendFrom = (creditObj.spacialCreditID).split("-")[0];
                lendObj.lendTo = null;
            }
            // Now insert data to Lend table
            lendObj.fullPayment = 0;
            lendObj.partialPaymentID = null;
            lendObj.paymentOnDate = null;
            lendObj.userId = userID;

            creditObj.lendId = await addLendDetails(lendObj);
        }
    }
    await creditRepo.saveCredit(creditObj);

}

module.exports = { addCreditDetails };