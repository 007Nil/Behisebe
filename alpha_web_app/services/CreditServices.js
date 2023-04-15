const crypto = require("crypto");
// Servcies
const { getAllCreditReasonByUserId, addCreditReason } = require("./CreditReasonService");
const { getPersonDataByUserId, addPersonData } = require("./PersonService");
const dailyClosingService = require("./DailyClosingService");
const lendService = require("./MoneyLendService");
const { updateDailyClosingCash } = require("./DailyClosingCashService");
const BankService = require("./BankServices");

//  Repo
const creditRepo = require("../repository/CreditRepo");
// Models
const LendModel = require("../model/LendModel");
const PersonModel = require("../model/PersonModel");
const CreditReasonModel = require("../model/CreditReasonModel");
const DailyClosingModel = require("../model/DailyClosingModel");
const DailyClosingCashModel = require("../model/DailyClosingCashModel");
const CreditModel = require("../model/CreditModel");


async function addCreditDetails(creditObj) {

    creditObj.creditId = crypto.randomBytes(10).toString("hex");
    let userID = creditObj.userId;
    let isCashCredit = creditObj.byCash;


    if (creditObj.reason) {
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
    if (isCashCredit) {
        creditObj.byCash = 1; // true
        // creditObj.reason = "6765454367";
    } else {
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

async function getCreditDetailsByuserId(requestObj) {
    let userId = requestObj.userId;
    requestObj.startDate = requestObj.startDate.replaceAll("/", "-");
    requestObj.endDate = requestObj.endDate.replaceAll("/", "-");
    // console.log(requestObj);
    let returnData = [];
    let bankList = await BankService.getUserBankDetails(userId);
    let reasonList = await getAllCreditReasonByUserId(userId);
    let personList = await getPersonDataByUserId(userId);
    for (let eachBank of bankList) {
        let totalAmount = 0;
        let creditObj = new CreditModel();
        creditObj.bankId = eachBank.BankID;
        creditObj.userId = eachBank.UserID;
        creditObj.startDate = requestObj.startDate;
        creditObj.endDate = requestObj.endDate;
        eachBank.creditDetails = await creditRepo.getCreditByDate(creditObj);

        // console.log(creditObj.creditDetails)

        for (let eachCredit of eachBank.creditDetails) {
            totalAmount += eachCredit.Amount;
            for (let reason of reasonList) {
                if (reason.ID === eachCredit.Reason) {
                    eachCredit.Reason = reason.Reason;
                    break;
                }
            }
            if (eachCredit.LendID) {
                // console.log("HIT")
                let personId = await lendService.getLendFromByID(eachCredit.LendID);
                // console.log(personId)
                for (let person of personList) {
                    // console.log(person)
                    if (person.ID === personId) {
                        // console.log("HIT")
                        eachCredit.Reason += ` To ${person.Name}` 
                        break;
                    }
                }
            }
        }
        returnData.push(eachBank);
        eachBank.totalCredit = totalAmount;
    }
    return returnData;
}


async function getCashCreditDetailsByUserId(requestObj) {

    requestObj.startDate = requestObj.startDate.replaceAll("/", "-");
    requestObj.endDate = requestObj.endDate.replaceAll("/", "-");
    let reasonList = await getAllCreditReasonByUserId(requestObj.userId);
    let personList = await getPersonDataByUserId(requestObj.userId);
    // console.log(reasonList);
    let cashCreditObj = await creditRepo.getCashCreditByDate(requestObj)
    for (eachCashCredit of cashCreditObj) {
        for (let reason of reasonList){
            if (reason.ID === eachCashCredit.Reason){
                // console.log("HIT")
                eachCashCredit.Reason = reason.Reason;
                break;
            }
        }
        if (eachCashCredit.LendID) {
            for (let person of personList){
                let personId = await lendService.getLendFromByID(eachCashCredit.LendID);
                if (person.ID === personId){
                    eachCashCredit.Reason += ` From ${person.Name}` 
                }
            }
        }

        // console.log()

    }
    // return ();
    // console.log(cashCreditObj)
    return cashCreditObj;

}


module.exports.getCreditLendData = getCreditLendData;
module.exports.addCreditDetails = addCreditDetails;
module.exports.getCreditDetailsByuserId = getCreditDetailsByuserId;
module.exports.getCashCreditDetailsByUserId = getCashCreditDetailsByUserId;