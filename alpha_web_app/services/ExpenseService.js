const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");
const crypto = require("crypto");
const { fetchExpenseReasonByUserID, addExpenseReason, getExpenseNameByID } = require("./ExpenseReasonService");
const { getPersonData, addPersonData, getPersonNamebyID } = require("./PersonService");
const { addLendDetails, getLendByID } = require("./MoneyLendService");
const { getBankDetailsByID } = require("./BankServices");

async function addExpense(expenseObject) {
    // console.log(expenseObject);
    let userID = expenseObject.userID;
    let expenseReasonResult = await fetchExpenseReasonByUserID(userID);

    let expenseReason = expenseReasonResult.map(each => each.ID);
    // throw new Error("Duplicate entry for Bank ID")
    if (!expenseReason.includes(expenseObject.expenseReason)) {
        // New expense reason. Need to add to database
        // expenseObject.expenseReason is the text if not found
        // in expenseReason list
        // console.log("HIT");
        let reasonObj = {
            "expenseReason": expenseObject.expenseReason,
            "userID": userID
        }
        expenseObject.expenseReason = await addExpenseReason(reasonObj);
    }
    // Money Lend logic
    if (expenseObject.spacialDebit) {
        let getPersonDetails = await getPersonDataByUserId(userID);
        let personID = getPersonDetails.map(each => each.ID);

        console.log((expenseObject.spacialDebit).split("-")[1]);
        // Someone lend some mony from Me
        if ((expenseObject.spacialDebit).split("-")[1] === "lendMoney") {
            if (!personID.includes((expenseObject.spacialDebit).split("-")[0])) {
                // Add Person to Person table
                let personObj = {
                    "name": (expenseObject.spacialDebit).split("-")[0],
                    "userID": userID
                };
                expenseObject.LendTo = await addPersonData(personObj);
                expenseObject.LendFrom = null;
            }else{
                // We hve the person in DB
                expenseObject.LendTo = (expenseObject.spacialDebit).split("-")[0];
            }
        }
        console.log(expenseObject.userID);
        // Now insert data to Lend table
        expenseObject.lendID = await addLendDetails(expenseObject);
        // return;
        
        
        // console.log(personNames);
        // console.log(expenseObject);
    }
    
    const expenseID = crypto.randomBytes(10).toString("hex");
    let insertExpenseQuery = "INSERT INTO ?? (??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let prepareInsertExpenseQuery = mysql.format(insertExpenseQuery, ["Expense", "ID", "BankID", "UserID", "LendID", "Reason", "Date", "Notes", "Amount",
        expenseID, expenseObject.bankName, userID, expenseObject.lendID,
        expenseObject.expenseReason, expenseObject.date.replaceAll("/", "-"), expenseObject.Notes, expenseObject.amount]);
    // console.log(prepareInsertExpenseQuery);
    await mysqlPool.execute(prepareInsertExpenseQuery);
}

async function getExpenseDetailsByUserID(userID) {
    let selectQuery = "SELECT * FROM ?? WHERE ?? = ?";
    let prepareSelectQuery = mysql.format(selectQuery, ["Expense", "UserID", userID]);

    expenseList = await mysqlPool.execute(prepareSelectQuery);

    for (let eachDetails of expenseList[0]) {
        eachDetails.BankName = (await getBankDetailsByID(eachDetails.BankID))[0].BankName;
        delete eachDetails.BankID;
        eachDetails.Reason = await getExpenseNameByID(eachDetails.Reason);

        if (eachDetails.LendID) {
            // console.log(eachDetails.LendID);
            eachDetails.LendID = await getPersonNamebyID(await getLendByID(eachDetails.LendID));
            // delete eachDetails.LendID;
        }
    }
    return expenseList[0];
}
// Pay Of Debt
async function getLendToData(userID){
    let personInfo = await getPersonData(userID);
    let  
}

module.exports = { addExpense, getExpenseDetailsByUserID }