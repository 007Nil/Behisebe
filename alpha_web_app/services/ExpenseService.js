const crypto = require("crypto");
const { fetchExpenseReasonByUserID, addExpenseReason, getExpenseNameByID } = require("./ExpenseReasonService");
const { getPersonDataByUserId, addPersonData, getPersonNamebyID } = require("./PersonService");
const { addLendDetails, getLendByID } = require("./MoneyLendService");
const { getUserBankDetails } = require("./BankServices");
const dailyClosingService = require("./DailyClosingService");
const { updateDailyClosingCash } = require("./DailyClosingCashService");
const { getLendToByID } = require("./MoneyLendService");

//  Model
const ExpenseModel = require("../model/ExpenseModel");
const ExpenseReasonModel = require("../model/ExpenseReasonModel");
const LendModel = require("../model/LendModel");
const PersonModel = require("../model/PersonModel");
const DailyClosingModel = require("../model/DailyClosingModel");
const DailyClosingCashModel = require("../model/DailyClosingCashModel");

// Repos

const expenseRepo = require("../repository/ExpenseRepo");

async function addExpense(requestData) {
    // console.log(requestData);
    let expenseModel = new ExpenseModel();
    expenseModel.userId = requestData.userId;

    let expenseReasonResult = await fetchExpenseReasonByUserID(expenseModel.userId);

    let expenseReason = expenseReasonResult.map(each => each.ID);
    // throw new Error("Duplicate entry for Bank ID")
    if (!expenseReason.includes(requestData.expenseReason)) {
        // New expense reason. Need to add to database
        // requestData.expenseReason is the text if not found
        // in expenseReason list
        let expenseReasonModel = new ExpenseReasonModel();
        expenseReasonModel.reason = requestData.expenseReason;
        expenseReasonModel.userId = expenseModel.userId;
        // let reasonObj = {
        //     "expenseReason": requestData.expenseReason,
        //     "userId": userId
        // }
        expenseModel.reason = await addExpenseReason(expenseReasonModel);
        // console.log(expenseModel.reason);
    } else {
        expenseModel.reason = requestData.expenseReason;
    }
    // Money Lend logic
    if (requestData.spacialDebit) {
        let lendModel = new LendModel();

        let getPersonDetails = await getPersonDataByUserId(expenseModel.userId);
        let personID = getPersonDetails.map(each => each.ID);

        // console.log((requestData.spacialDebit).split("-")[1]);
        // Someone lend some mony from Me
        if ((requestData.spacialDebit).split("-")[1] === "lendMoney") {
            if (!personID.includes((requestData.spacialDebit).split("-")[0])) {
                // Add Person to Person table
                let personModel = new PersonModel();
                personModel.name = (requestData.spacialDebit).split("-")[0];
                personModel.userId = expenseModel.userId;
                lendModel.lendTo = await addPersonData(personModel);
                lendModel.lendFrom = null;
            } else {
                // We hve the person in DB
                lendModel.lendTo = (requestData.spacialDebit).split("-")[0];
                lendModel.lendFrom = null;
            }
        }
        lendModel.fullPayment = 0;
        lendModel.paymentOnDate = null;
        lendModel.userId = expenseModel.userId;
        lendModel.amount = requestData.amount;

        // Now insert data to Lend table
        expenseModel.lendId = await addLendDetails(lendModel);



        // console.log(personNames);
        // console.log(requestData);
    } else {
        expenseModel.lendId = null;
    }

    expenseModel.id = crypto.randomBytes(10).toString("hex");;
    if (requestData.byCash) {
        expenseModel.bankId = null;
        expenseModel.byCash = 1; // true
    } else {
        expenseModel.bankId = requestData.bankId;
        expenseModel.byCash = 0;

    }

    expenseModel.date = requestData.date;
    expenseModel.notes = requestData.notes;
    expenseModel.amount = requestData.amount;
    if (expenseModel.lendId) {
        expenseModel.lendClose = 0;
    }
    //console.log(expenseModel);
    await expenseRepo.saveExpense(expenseModel);
    // console.log(expenseModel.byCash)
    if (requestData.byCash) {
        let dailyCloisngCashObj = new DailyClosingCashModel();
        dailyCloisngCashObj.amount = expenseModel.amount;
        dailyCloisngCashObj.date = expenseModel.date.replaceAll("/", "-");
        dailyCloisngCashObj.isCredit = false;
        dailyCloisngCashObj.userId = expenseModel.userId;
        updateDailyClosingCash(dailyCloisngCashObj);
    } else {
        // console.log("HIT ELSE")
        let dailyClosingObj = new DailyClosingModel();
        dailyClosingObj.userId = expenseModel.userId;
        dailyClosingObj.amount = expenseModel.amount;
        dailyClosingObj.bankId = expenseModel.bankId;
        dailyClosingObj.date = expenseModel.date.replaceAll("/", "-");
        dailyClosingObj.isCredit = false;
        // console.log(dailyClosingObj)
        // console.log(dailyClosingObj);
        dailyClosingService.updateDailyClosing(dailyClosingObj);
    }


    if (expenseModel.reason === "6565454378") {
        // Cash withdrawal
        // console.log("HIT CASG")
        let dailyCloisngCashObj = new DailyClosingCashModel();
        dailyCloisngCashObj.amount = expenseModel.amount;
        dailyCloisngCashObj.date = expenseModel.date.replaceAll("/", "-");
        dailyCloisngCashObj.isCredit = true;
        dailyCloisngCashObj.userId = expenseModel.userId;
        updateDailyClosingCash(dailyCloisngCashObj);
    }

}

async function getExpenseDetailsByuserId(requestObj) {
    let userId = requestObj.userId;
    // console.log(requestObj)
    requestObj.startDate = requestObj.startDate.replaceAll("/", "-");
    requestObj.endDate = requestObj.endDate.replaceAll("/", "-");
    // console.log(requestObj)
    let returnData = []
    let bankList = await getUserBankDetails(userId);
    let reasonList = await fetchExpenseReasonByUserID(userId);
    let personList = await getPersonDataByUserId(userId);

    for (let eachBank of bankList) {
        let totalAmount = 0;
        let expenseData = new ExpenseModel()
        expenseData.bankId = eachBank.BankID;
        expenseData.userId = eachBank.UserID;
        expenseData.startDate = requestObj.startDate;
        expenseData.endDate = requestObj.endDate;
        eachBank.expenseDetails = await expenseRepo.getExpenseByDate(expenseData);
        for (let eachExpDetails of eachBank.expenseDetails) {
            totalAmount += eachExpDetails.Amount;
            for (let reason of reasonList) {
                if (reason.ID === eachExpDetails.Reason) {
                    eachExpDetails.Reason = reason.Reason;
                    break;
                }
            }
            if (eachExpDetails.LendID) {
                // console.log("HIT")
                let personId = await getLendToByID(eachExpDetails.LendID);
                // console.log(personId)
                for (let person of personList) {
                    // console.log(person)
                    if (person.ID === personId) {
                        eachExpDetails.LendTo = person.Name;
                        break;
                    }
                }
            }
        }
        returnData.push(eachBank);
        eachBank.totalExpense = totalAmount;
        // console.log(eachBank);
        // break;
    }

    return returnData;
}

async function getCashExpenseDetailsByUserId(requestObj) {

    requestObj.startDate = requestObj.startDate.replaceAll("/", "-");
    requestObj.endDate = requestObj.endDate.replaceAll("/", "-");
    let reasonList = await fetchExpenseReasonByUserID(requestObj.userId);
    let personList = await getPersonDataByUserId(requestObj.userId);
    // console.log(reasonList);
    let cashExpObj = await expenseRepo.getCashExpenseByUserId(requestObj)
    for (eachCashExp of cashExpObj) {
        for (let reason of reasonList) {
            if (reason.ID === eachCashExp.Reason) {
                // console.log("HIT")
                eachCashExp.Reason = reason.Reason;
                break;
            }
        }
        if (eachCashExp.LendID) {
            for (let person of personList) {
                let personId = await getLendToByID(eachCashExp.LendID);
                if (person.ID === personId) {
                    eachCashExp.Reason += ` To ${person.Name}`
                }
            }
        }

    }
    // return ();
    // console.log(cashExpObj)
    return cashExpObj;

}


module.exports = {
    addExpense,
    getExpenseDetailsByuserId,
    getCashExpenseDetailsByUserId
}