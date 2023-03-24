const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");
const crypto = require("crypto");
// Custom modules
const bankAccountTypeRepo = require("../repository/BankAccountTypeRepo");
const bankRepo = require("../repository/BankRepo");
// Models
const BankModel = require("../model/BankModel");
const CreditModel = require("../model/CreditModel");

const {addCreditDetails} = require("./CreditServices");

async function getAccountType() {
    return bankAccountTypeRepo.getAccountType();
}

async function fetchBankDetails(userID) {
    let selectBanksQuery = "SELECT * FROM ?? WHERE ?? = ?";
    let prepareSelectBankQuery = mysql.format(selectBanksQuery, ["Bank","UserID",userID]);

    let queryResult = await mysqlPool.execute(prepareSelectBankQuery);
    return queryResult[0];
}

async function getBankDetailsByID(bankID){
   return bankRepo.getBankDetailsByID(bankID);
}

function getAccountCurrentBalance() {

}

async function addBankDetails(requestData) {
    let bankObj = new BankModel();
    
    console.log(requestData);
    bankObj.bankID = crypto.randomBytes(10).toString("hex");
    
    bankObj.bankName = requestData.bank_name;
    bankObj.acccountType = requestData.bankAccountType;
    bankObj.notes = requestData.notes;
    bankObj.userID = requestData.userID;
    bankObj.isDefault = 0;
    bankObj.addedOn = requestData.date;


    bankRepo.saveBank(bankObj)

    // let creditObj = new CreditModel();
    // creditObj.id = crypto.randomBytes(10).toString("hex");;
    // creditObj.bankID = bankObj.id;
    // creditObj.userID = requestData.userID;
    // creditObj.reason = requestData.creditCause;
    // creditObj


    return;
    // const bankID = "905f00d60f068b1f2e8b";
    // Insert values in Bank table
    // let bankDetailsInsertQuery = "INSERT INTO ?? (??,??,??,??, ??,??,??) VALUES (?,?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'))";
    // let prepareBankQuery = mysql.format(bankDetailsInsertQuery, ["Bank", "BankID", "BankName", "AccountType", "UserID", "IsDefault", "Notes","AddedOn",
    //     bankID, bankDetailsObject.bankName, bankDetailsObject.bankAccountType, bankDetailsObject.userID, 0, bankDetailsObject.notes,bankDetailsObject.date]);
    // // console.log(prepareBankQuery);
    // await mysqlPool.execute(prepareBankQuery);

    creditObj = {
        "bankID": bankID,
        "UserID": bankDetailsObject.userID,
        "spacialCreditID": bankDetailsObject.borrowFrom,
        "creditReasonID": bankDetailsObject.creditCause,
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