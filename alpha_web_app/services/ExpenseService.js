const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");
const { fetchExpenseReasonByUserID, addExpenseReason } = require("./ExpenseReasonService");

async function addExpense(expenseObject) {
    // console.log(expenseObject);
    let expenseReasonResult = await fetchExpenseReasonByUserID(expenseObject.userID);

    let expenseReason = expenseReasonResult.map(each => each.ID);
    // throw new Error("Duplicate entry for Bank ID")
    if (!expenseReason.includes(expenseObject.expenseReason)) {
        // New expense reason. Need to add to database
        // expenseObject.expenseReason is the text if not found
        // in expenseReason list
        // console.log("HIT");
        let reasonObj = {
            "expenseReason": expenseObject.expenseReason,
            "userID": expenseObject.userID
        }
        expenseObject.expenseReason = await addExpenseReason(reasonObj);
    }
    console.log(expenseObject);
    const expenseID = crypto.randomBytes(10).toString("hex");
    let insertExpenseQuery = "INSERT INTO ?? (??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let prepareInsertExpenseQuery = mysql.format(insertExpenseQuery, ["Expense", "ID", "BankID", "UserID", "LendID", "Reason", "Date", "Notes", "Amount",
        expenseID, expenseObject.bankName, expenseObject.userID, expenseObject.lendMoneyTo,
        expenseObject.expenseReason, expenseObject.date.replaceAll("/","-"), expenseObject.Notes, expenseObject.amount]);
    console.log(prepareInsertExpenseQuery);
    await mysqlPool.execute(prepareInsertExpenseQuery);




}

module.exports = { addExpense }