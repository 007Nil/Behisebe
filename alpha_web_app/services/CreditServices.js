const crypto = require("crypto");
// Servcies
const { getAllCreditReasonByUserId, addCreditReason } = require("./CreditReasonService");
const { getPersonDataByUserId, addPersonData } = require("./PersonService");
const dailyClosingService = require("./DailyClosingService");
const lendService = require("./MoneyLendService");
const { updateDailyClosingCash } = require("./DailyClosingCashService");

//  Repo
const creditRepo = require("../repository/CreditRepo");
// Models
const LendModel = require("../model/LendModel");
const PersonModel = require("../model/PersonModel");
const CreditReasonModel = require("../model/CreditReasonModel");
const DailyClosingModel = require("../model/DailyClosingModel");
const DailyClosingCashModel = require("../model/DailyClosingCashModel");


async function addCreditDetails(creditObj) {

    creditObj.creditId = crypto.randomBytes(10).toString("hex");
    let userID = creditObj.userId;
    let isCashCredit = creditObj.byCash;
    

    if (creditObj.reason){
        let creditReasonResult = await getAllCreditReasonByUserId(userID);
        let creditResult = creditReasonResult.map(each => each.ID);

        if (!creditResult.includes(creditObj.reason)) {
            // Find new reason, So save the data
            let creditReasonObj = new CreditReasonModel();
            creditReasonObj.reason = creditObj.reason;
            creditReasonObj.userId = userID;
    
            creditObj.reason = await addCreditReason(creditReasonObj);
        }
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
            lendObj.paymentOnDate = null;
            lendObj.userId = userID;


            creditObj.lendId = await lendService.addLendDetails(lendObj);
        }
    }
    if (isCashCredit){
        creditObj.byCash = 1; // true
        creditObj.reason = "6765454367";
    }else {
        creditObj.byCash = 0;
    }
    await creditRepo.saveCredit(creditObj);
    // console.log(creditObj);
    if (isCashCredit) {
        let dailyCloisngCashObj = new DailyClosingCashModel();
        dailyCloisngCashObj.amount = creditObj.amount;
        dailyCloisngCashObj.date = creditObj.date.replaceAll("/", "-");
        dailyCloisngCashObj.isCredit = true;
        dailyCloisngCashObj.userId = creditObj.userId;
        updateDailyClosingCash(dailyCloisngCashObj);
    } else {
        let dailyClosingObj = new DailyClosingModel();
        dailyClosingObj.userId = userID;
        dailyClosingObj.amount = creditObj.amount;
        dailyClosingObj.bankId = creditObj.bankId;
        dailyClosingObj.date = creditObj.date.replaceAll("/", "-");
        dailyClosingObj.isCredit = true;
        // console.log(dailyClosingObj);
        dailyClosingService.updateDailyClosing(dailyClosingObj);
    }
}



async function getCreditLendData(userId) {
    // console.log("HIT")
    // console.log((await creditRepo.getCreditLendData(userId))[0])
    return (await creditRepo.getCreditLendData(userId));
}

module.exports.getCreditLendData = getCreditLendData;
module.exports.addCreditDetails = addCreditDetails;