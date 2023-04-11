const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveExpense(expenseObj) {
    console.log("HIT")
    let insertExpenseQuery = "INSERT INTO ?? (??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let prepareInsertExpenseQuery = mysql.format(insertExpenseQuery, ["Expense", "ID", "BankID", "userId","ByCash", "LendID", "Reason", "Date", "Notes", "Amount",
    expenseObj.id, expenseObj.bankId, expenseObj.userId, expenseObj.byCash, expenseObj.lendId,
        expenseObj.reason, expenseObj.date.replaceAll("/", "-"), expenseObj.notes, expenseObj.amount]);
    // console.log(prepareInsertExpenseQuery);
    await mysqlPool.execute(prepareInsertExpenseQuery);
}

async function getExpenseByBankId(expenseObj){
    let query = "SELECT * from ?? WHERE ?? = ? AND ?? = ?";
    let preapreQuery = mysql.format(query,["Expense","BankID",expenseObj.bankId,"userId",expenseObj.userId]);
    // console.log(preapreQuery)
    return (await mysqlPool.execute(preapreQuery))[0]
}

module.exports = {
    saveExpense,
    getExpenseByBankId
}