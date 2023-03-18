const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");


async function addCreditDetails(creditObj) {
    // Add data to Creadit table
    const creditID = crypto.randomBytes(10).toString("hex");
    let creaditInsertQuery = "INSERT INTO ?? (??, ??,??,??,??,??,??,??) VALUES (?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let prepareCerditQuery = mysql.format(creaditInsertQuery, ["Credit", "CreditID", "BankID","UserID","BorrowID","Reason","Date", "Amount", "Notes",
        creditID, creditObj.bankID,creditObj.userID,creditObj.borrowID,creditObj.reason,creditObj.date,creditObj.amount,creditObj.notes]);

    await mysqlPool.execute(prepareCerditQuery);
}

module.exports = {addCreditDetails};