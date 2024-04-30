const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveExpenseReason(expenseReasonModel) {
    let insertQuery = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
    let prepareInsertQuery = mysql.format(insertQuery, ["ExpenseReason", "ID", "Reason", "UserID","isVisable",
        expenseReasonModel.id, expenseReasonModel.reason, expenseReasonModel.userId,1]);
    await mysqlPool.execute(prepareInsertQuery);
}

async function fetchExpenseReasonByUserID(userId) {
    selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ? AND ?? = ?";
    prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["ExpenseReason", "UserID", userId, "UserID", null,"isVisable", 1]);

    return (await mysqlPool.execute(prepareSelectReasonQuery))[0];
}

async function fetchAllExpenseReasonByUserID(userId) {
    selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ?";
    prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["ExpenseReason", "UserID", userId, "UserID", null]);
    console.log(prepareSelectReasonQuery)
    return (await mysqlPool.execute(prepareSelectReasonQuery))[0];
}


module.exports = {
    saveExpenseReason,
    fetchExpenseReasonByUserID,
    fetchAllExpenseReasonByUserID
}