const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveExpenseReason(expenseReasonModel) {
    let insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
    let prepareInsertQuery = mysql.format(insertQuery, ["ExpenseReason", "ID", "Reason", "UserID",
        expenseReasonModel.id, expenseReasonModel.reason, expenseReasonModel.userId]);
    // console.log(prepareInsertQuery);
    await mysqlPool.execute(prepareInsertQuery);
}

async function fetchExpenseReasonByUserID(userId) {
    selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ? AND ?? <>?";
    prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["ExpenseReason", "UserID", userId, "UserID", null,"ID","1234567098"]);

    return (await mysqlPool.execute(prepareSelectReasonQuery))[0];
}

module.exports = {
    saveExpenseReason,
    fetchExpenseReasonByUserID
}