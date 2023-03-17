const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function fetchExpenseReasonByUserID(userID){
    // console.log(userID);
    selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ?";
    prepareSelectReasonQuery = mysql.format(selectReasonQuery,["ExpenseReason","UserID",userID,"UserID",null]);
    // console.log(prepareSelectReasonQuery);
    queryResult = await mysqlPool.execute(prepareSelectReasonQuery);
    // console.log(queryResult[0]);
    return queryResult[0];
}

async function addExpenseReason(reasonObejct){
    console.log(reasonObejct);
    const expenseReasonID = crypto.randomBytes(10).toString("hex");
    // const expenseReasonID = "ec163a877dcee66fed49";
    insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
    prepareInsertQuery = mysql.format(insertQuery,["ExpenseReason","ID","Reason","UserID",
                                        expenseReasonID,reasonObejct.expenseReason,reasonObejct.userID]);
    // console.log(prepareInsertQuery);
    await mysqlPool.execute(prepareInsertQuery);
    return expenseReasonID;
}

async function getExpenseNameByID(expenseID){
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ?";
    prepareQuery = mysql.format(selectQuery,["Reason","ExpenseReason","ID",expenseID]);
    return (await mysqlPool.execute(prepareQuery))[0][0].Reason;
}

module.exports = {fetchExpenseReasonByUserID, addExpenseReason,getExpenseNameByID}

