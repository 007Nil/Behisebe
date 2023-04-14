const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveCredit(creditObj) {
    // console.log(creditObj)
    let creaditInsertQuery = "INSERT INTO ?? (??, ??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let prepareCerditQuery = mysql.format(creaditInsertQuery, ["Credit", "CreditID", "BankID", "UserID", "ByCash", "LendID", "Reason", "Date", "Amount", "Notes",
        creditObj.creditId, creditObj.bankId, creditObj.userId, creditObj.byCash, creditObj.lendId, creditObj.reason, (creditObj.date).replaceAll("/", "-"), creditObj.amount, creditObj.notes]);
    console.log(prepareCerditQuery);
    await mysqlPool.execute(prepareCerditQuery);

}

async function getCreditLendData(userId) {
    let query = "SELECT * FROM ?? WHERE ?? = ? AND ?? IS NOT NULL";
    let prepareQuery = mysql.format(query, ["Credit", "UserID", userId, "LendID"]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

async function getCreditByDate(creditObj) {
    let query = "SELECT * from ?? WHERE ?? = ? AND ?? = ? AND (?? BETWEEN STR_TO_DATE(?,'%m-%d-%Y') AND STR_TO_DATE(?,'%m-%d-%Y'))";
    let preapreQuery = mysql.format(query, ["Credit", "BankID", creditObj.bankId, "UserId", creditObj.userId, "Date", creditObj.startDate, creditObj.endDate]);
    
    // console.log(preapreQuery)
    return (await mysqlPool.execute(preapreQuery))[0]
}

async function getCashCreditByDate(creditObj) {
    let query = "SELECT * from ?? WHERE ?? = ? AND ?? = ? AND (?? BETWEEN STR_TO_DATE(?,'%m-%d-%Y') AND STR_TO_DATE(?,'%m-%d-%Y'))";
    let preapreQuery = mysql.format(query, ["Credit", "ByCash", 1, "UserId", creditObj.userId, "Date", creditObj.startDate, creditObj.endDate]);
    
    // console.log(preapreQuery)
    return (await mysqlPool.execute(preapreQuery))[0]
}

module.exports = {
    saveCredit,
    getCreditLendData,
    getCreditByDate,
    getCashCreditByDate
}