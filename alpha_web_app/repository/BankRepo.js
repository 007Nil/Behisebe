const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");


async function getBankDetailsByID(bankID) {
    let selectBanksQuery = "SELECT ?? FROM ?? WHERE ?? = ?";
    let prepareSelectBankQuery = mysql.format(selectBanksQuery, ["BankName", "Bank", "BankID", bankID]);
    // console.log(prepareSelectBankQuery);
    let bankName = await mysqlPool.execute(prepareSelectBankQuery);
    // console.log(bankName[0])
    return bankName[0];
}

async function saveBank(bankObj) {
    let bankDetailsInsertQuery = "INSERT INTO ?? (??,??,??,??, ??,??,??) VALUES (?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?)";
    let prepareBankQuery = mysql.format(bankDetailsInsertQuery, ["Bank", "BankID", "BankName", "AccountType", "UserID", "IsDefault", "AddedOn", "Notes",
        bankObj.bankID, bankObj.bankName, bankObj.acccountType, bankObj.userID, bankObj.isDefault, bankObj.addedOn, bankObj.notes]);

    // console.log(prepareBankQuery);
    await mysqlPool.execute(prepareBankQuery);
}

module.exports = {
    getBankDetailsByID,
    saveBank
}