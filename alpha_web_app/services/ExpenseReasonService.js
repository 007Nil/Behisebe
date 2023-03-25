const crypto = require("crypto");

// Repos
const expenseRepo = require("../repository/ExpenseReasonRepo"); 

async function fetchExpenseReasonByUserID(userId){
    return expenseRepo.fetchExpenseReasonByUserID(userId);
 
}

async function addExpenseReason(expenseReasonObj){
    expenseReasonObj.id = crypto.randomBytes(10).toString("hex");
    await expenseRepo.saveExpenseReason(expenseReasonObj);

    return expenseReasonObj.id;
}

async function getExpenseNameByID(expenseID){
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ?";
    prepareQuery = mysql.format(selectQuery,["Reason","ExpenseReason","ID",expenseID]);
    return (await mysqlPool.execute(prepareQuery))[0][0].Reason;
}

module.exports = {fetchExpenseReasonByUserID, addExpenseReason,getExpenseNameByID}

