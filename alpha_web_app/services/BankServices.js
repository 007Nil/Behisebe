const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");
const crypto = require("crypto");
// Repos
const bankAccountTypeRepo = require("../repository/BankAccountTypeRepo");
const bankRepo = require("../repository/BankRepo");
// Models
const BankModel = require("../model/BankModel");
const CreditModel = require("../model/CreditModel");
// Services
const { addCreditDetails } = require("./CreditServices");

async function getAccountType() {
    return bankAccountTypeRepo.getAccountType();
}

async function fetchBankDetails(userID) {
    return bankRepo.fetchBankDetails(userID);
}

async function getBankDetailsByID(bankID) {
    return bankRepo.getBankDetailsByID(bankID);
}

async function getUserBankDetails(userId) {
    return bankRepo.getUserBankDetails(userId);
}

function getAccountCurrentBalance() {

}

async function addBankDetails(requestData) {

    // try {
    // console.log(requestData.creditCause);
    let bankObj = new BankModel();

    // console.log(requestData);
    bankObj.bankID = crypto.randomBytes(10).toString("hex");

    bankObj.bankName = requestData.bankName;
    bankObj.acccountType = requestData.bankAccountType;
    bankObj.notes = requestData.notes;
    bankObj.userID = requestData.userID;
    bankObj.isDefault = 0;
    bankObj.addedOn = requestData.date;


    await bankRepo.saveBank(bankObj)

    let creditObj = new CreditModel();
    creditObj.creditId = crypto.randomBytes(10).toString("hex");;
    creditObj.bankId = bankObj.bankID;
    creditObj.userId = requestData.userID;
    creditObj.lendId = null;
    creditObj.reason = "565434329";
    creditObj.date = bankObj.addedOn;
    creditObj.amount = requestData.bankBalance;
    creditObj.notes = "This is the initial amount when this Bank was added to system";
    await addCreditDetails(creditObj);
    // await getCreditLendData();
}

function makeBankInvalida() {

}

module.exports = {
    fetchBankDetails,
    addBankDetails,
    makeBankInvalida,
    getAccountType,
    getBankDetailsByID,
    getUserBankDetails
}