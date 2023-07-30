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
const { getDailyClosing } = require("./DailyClosingService");

async function getAccountType() {
    return await bankAccountTypeRepo.getAccountType();
}

async function fetchBankDetails(userID) {
    return bankRepo.getUserBankDetails(userID);
}

async function getBankDetailsByID(bankID) {
    return bankRepo.getBankDetailsByID(bankID);
}

async function getUserBankDetails(requestObj) {
    let userId = requestObj.userId;
    let bankData = await bankRepo.getUserBankDetails(userId);
    let accountTypes = await getAccountType();
    for (eachBank of bankData) {
        for (eachType of accountTypes) {
            if (eachBank.AccountType === eachType.ID) {
                eachBank.AccountType = eachType.AccountType;
            }
            try {
                dailyCloisngObj = {
                    "bankId": eachBank.BankID,
                    "date": requestObj.date.replaceAll("/", "-"),
                    "userId": userId,
                }
                eachBank.bankBalance = (await getDailyClosing(dailyCloisngObj)).Amount;
            } catch {

            }
        }
    }
    return bankData;
}

async function addBankDetails(requestData) {

    let bankObj = new BankModel();
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
}

function makeBankInvalida() {

}

module.exports.fetchBankDetails = fetchBankDetails;
module.exports.addBankDetails = addBankDetails;
module.exports.makeBankInvalida = makeBankInvalida;
module.exports.getAccountType = getAccountType;
module.exports.getBankDetailsByID = getBankDetailsByID;
module.exports.getUserBankDetails = getUserBankDetails;