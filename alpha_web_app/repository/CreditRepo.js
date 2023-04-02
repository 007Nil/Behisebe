const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveCredit(creditObj) {
    // console.log(creditObj)
    let creaditInsertQuery = "INSERT INTO ?? (??, ??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let prepareCerditQuery = mysql.format(creaditInsertQuery, ["Credit", "CreditID", "BankID", "UserID","ByCash", "LendID", "Reason", "Date", "Amount", "Notes",
        creditObj.creditId, creditObj.bankId, creditObj.userId, creditObj.byCash, creditObj.lendId, creditObj.reason, (creditObj.date).replaceAll("/", "-"), creditObj.amount, creditObj.notes]);

    await mysqlPool.execute(prepareCerditQuery);

}

async function getCreditLendData(userId){
    let query = "SELECT * FROM ?? WHERE ?? = ? AND ?? IS NOT NULL";
    let prepareQuery = mysql.format(query,["Credit","UserID",userId,"LendID"]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

module.exports = {
    saveCredit,
    getCreditLendData
}