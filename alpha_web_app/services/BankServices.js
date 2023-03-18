const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

const {addCreditDetails} = require("./CreditServices");

async function getAccountType() {
    let selectAccountTypeQuery = "SELECT * FROM ??";
    let prepareAccountTypeQuery = mysql.format(selectAccountTypeQuery, ["BankAccountType"]);

    let queryResult = await mysqlPool.execute(prepareAccountTypeQuery);
    return queryResult[0];
}

async function fetchBankDetails(userID) {
    let selectBanksQuery = "SELECT * FROM ?? WHERE ?? = ?";
    let prepareSelectBankQuery = mysql.format(selectBanksQuery, ["Bank","UserID",userID]);

    let queryResult = await mysqlPool.execute(prepareSelectBankQuery);
    return queryResult[0];
}

async function getBankDetailsByID(bankID){
    let selectBanksQuery = "SELECT ?? FROM ?? WHERE ?? = ?";
    let prepareSelectBankQuery = mysql.format(selectBanksQuery, ["BankName","Bank","BankID",bankID]);
    // console.log(prepareSelectBankQuery);
    let bankName = await mysqlPool.execute(prepareSelectBankQuery);
    // console.log(bankName[0])
    return bankName[0];
}

function getAccountCurrentBalance() {

}

async function addBankDetails(bankDetailsObject) {
    const bankID = crypto.randomBytes(10).toString("hex");
    // const bankID = "905f00d60f068b1f2e8b";
    // Insert values in Bank table
    let bankDetailsInsertQuery = "INSERT INTO ?? (??,??,??,??, ??,??,??) VALUES (?,?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'))";
    let prepareBankQuery = mysql.format(bankDetailsInsertQuery, ["Bank", "BankID", "BankName", "AccountType", "UserID", "IsDefault", "Notes","AddedOn",
        bankID, bankDetailsObject.bankName, bankDetailsObject.bankAccountType, bankDetailsObject.userID, 0, bankDetailsObject.notes,bankDetailsObject.date]);
    // console.log(prepareBankQuery);
    await mysqlPool.execute(prepareBankQuery);

    let creditObj = {
        "bankID": bankID,
        "userID": bankDetailsObject.userID,
        "borrowID": bankDetailsObject.borrowFrom,
        "reason": bankDetailsObject.creditCause,
        "date": bankDetailsObject.date,
        "notes": "This is the initial amount when this Bank was added to system",
        "amount": bankDetailsObject.bankBalance
    }
    console.log(creditObj)
    await addCreditDetails(creditObj);
}

function makeBankInvalida() {

}

module.exports = { fetchBankDetails, addBankDetails, makeBankInvalida, getAccountType, getBankDetailsByID }