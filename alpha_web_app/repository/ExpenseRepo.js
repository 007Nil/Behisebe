const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveExpense(expenseObj) {
    console.log("HIT")
    let insertExpenseQuery = "INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?,?)";
    let prepareInsertExpenseQuery = mysql.format(insertExpenseQuery, ["Expense", "ID", "BankID", "userId", "ByCash", "LendID", "Reason", "Date", "Notes", "Amount", "LendClose",
        expenseObj.id, expenseObj.bankId, expenseObj.userId, expenseObj.byCash, expenseObj.lendId,
        expenseObj.reason, expenseObj.date.replaceAll("/", "-"), expenseObj.notes, expenseObj.amount, expenseObj.lendClose]);
    // console.log(prepareInsertExpenseQuery);
    await mysqlPool.execute(prepareInsertExpenseQuery);
}

async function getExpenseByBankId(expenseObj) {
    let query = "SELECT * from ?? WHERE ?? = ? AND ?? = ?";
    let preapreQuery = mysql.format(query, ["Expense", "BankID", expenseObj.bankId, "userId", expenseObj.userId]);
    // console.log(preapreQuery)
    return (await mysqlPool.execute(preapreQuery))[0]
}

async function getExpenseByDate(expenseData) {
    let query = "SELECT * from ?? WHERE ?? = ? AND ?? = ? AND (?? BETWEEN STR_TO_DATE(?,'%m-%d-%Y') AND STR_TO_DATE(?,'%m-%d-%Y'))";
    let preapreQuery = mysql.format(query, ["Expense", "BankID", expenseData.bankId, "UserId", expenseData.userId, "Date", expenseData.startDate, expenseData.endDate]);

    // console.log(preapreQuery)
    return (await mysqlPool.execute(preapreQuery))[0]
}

async function getCashExpenseByUserId(requestObj) {
    let query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ? AND (?? BETWEEN STR_TO_DATE(?,'%m-%d-%Y') AND STR_TO_DATE(?,'%m-%d-%Y')) ORDER BY `Date` DESC";
    let preapreQuery = mysql.format(query, ["Expense", "ByCash", 1, "UserID", requestObj.userId, "Date", requestObj.startDate, requestObj.endDate]);
    console.log(preapreQuery)
    return (await mysqlPool.execute(preapreQuery))[0];
}

async function getActiveLendData(userId) {
    let query = "SELECT * FROM ?? WHERE ?? = ? AND ?? IS NOT NULL AND ?? = ?";
    let prepareQuery = mysql.format(query, ["Expense", "UserID", userId, "LendID", "LendClose", 0]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

function closeLend(expenseId) {
    let query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    let preapreQuery = mysql.format(query,["Expense","LendClose",1,"ID",expenseId]);
    mysqlPool.execute(preapreQuery);
}

module.exports = {
    saveExpense,
    getExpenseByBankId,
    getExpenseByDate,
    getCashExpenseByUserId,
    getActiveLendData,
    closeLend
}