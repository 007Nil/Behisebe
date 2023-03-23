const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function getAccountType() {
    console.log("HIT");
    let selectAccountTypeQuery = "SELECT * FROM ??";
    let prepareAccountTypeQuery = mysql.format(selectAccountTypeQuery, ["BankAccountType"]);

    let queryResult = await mysqlPool.execute(prepareAccountTypeQuery);
    console.log(queryResult[0]);
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

module.exports = {getAccountType,getBankDetailsByID};