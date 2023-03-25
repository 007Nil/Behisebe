const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveCredit(creditObj) {
    // console.log(creditObj)
    let creaditInsertQuery = "INSERT INTO ?? (??, ??,??,??,??,??,??,??) VALUES (?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let prepareCerditQuery = mysql.format(creaditInsertQuery, ["Credit", "CreditID", "BankID", "UserID", "LendID", "Reason", "Date", "Amount", "Notes",
        creditObj.creditId, creditObj.bankId, creditObj.userId, creditObj.lendId, creditObj.reason, (creditObj.date).replaceAll("/", "-"), creditObj.amount, creditObj.notes]);

    await mysqlPool.execute(prepareCerditQuery);

}

module.exports = {
    saveCredit
}