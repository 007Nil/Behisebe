const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");
const crypto = require("crypto");
const { fetchExpenseReasonByUserID, addExpenseReason, getExpenseNameByID } = require("./ExpenseReasonService");
const { getPersonDataByUserId, addPersonData, getPersonNamebyID } = require("./PersonService");
const { addLendDetails, getLendByID } = require("./MoneyLendService");
const { getBankDetailsByID } = require("./BankServices");

//  Model
const ExpenseModel = require("../model/ExpenseModel");
const ExpenseReasonModel = require("../model/ExpenseReasonModel");
const LendModel = require("../model/LendModel");
const PersonModel = require("../model/PersonModel");

// Repos

const expenseRepo = require("../repository/ExpenseRepo");

async function addExpense(requestData) {
    console.log(requestData);
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
        lendModel.partialPaymentID = null;
        lendModel.paymentOnDate = null;
        lendModel.userId = expenseModel.userId;

        // Now insert data to Lend table
        expenseModel.lendId = await addLendDetails(lendModel);



        // console.log(personNames);
        // console.log(requestData);
    } else {
        expenseModel.lendId = null;
    }

    expenseModel.id = crypto.randomBytes(10).toString("hex");;

    expenseModel.bankId = requestData.bankId;
    expenseModel.date = requestData.date;
    expenseModel.notes = requestData.notes;
    expenseModel.amount = requestData.amount;

    await expenseRepo.saveExpense(expenseModel);

}

async function getExpenseDetailsByuserId(userId) {
    let selectQuery = "SELECT * FROM ?? WHERE ?? = ?";
    let prepareSelectQuery = mysql.format(selectQuery, ["Expense", "userId", userId]);

    expenseList = await mysqlPool.execute(prepareSelectQuery);

    for (let eachDetails of expenseList[0]) {
        eachDetails.BankName = (await getBankDetailsByID(eachDetails.BankID))[0].BankName;
        delete eachDetails.BankID;
        eachDetails.Reason = await getExpenseNameByID(eachDetails.Reason);

        if (eachDetails.LendID) {
            // console.log(eachDetails.LendID);
            eachDetails.LendID = await getPersonNamebyID(await getLendByID(eachDetails.LendID));
            // delete eachDetails.LendID;
        }
    }
    return expenseList[0];
}
// Pay Of Debt
// async function getLendToData(userId) {
//     let personInfo = await getPersonData(userId);
//     let
// }

module.exports = { addExpense, getExpenseDetailsByuserId }