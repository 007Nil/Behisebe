const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");
const crypto = require("crypto");
const { getCreditReason, addCreditReason } = require("./CreditReasonService");
const { getPersonData, addPersonData, getPersonNamebyID } = require("./PersonService");
const { addLendDetails, getLendByID } = require("./MoneyLendService");

async function addCreditDetails(creditObj) {
    console.log(creditObj);
    // Add data to Creadit table
    let userID = creditObj.UserID;
    let creditReasonResult = await getCreditReason(userID);

    let creditResult = creditReasonResult.map(each => each.ID);

    // return;
    // throw new Error("Duplicate entry for Bank ID");
    if (!creditResult.includes(creditObj.creditReasonID)) {
        // Find new reason, So save the data
        let reasonObj = {
            "creditReason": creditObj.creditReasonID,
            "userID": userID
        };

        creditObj.creditReasonID = await addCreditReason(reasonObj);
    }

    // Spacial Credit Logic
    if (creditObj.spacialCreditID) {
        let getPersonDetails = await getPersonData(userID);
        let personID = getPersonDetails.map(each => each.ID);
        //  I lend some momey from someone
        if ((creditObj.spacialCreditID).split("-")[1] === "lendMoney") {
            // console.log("HIT");
            if (!personID.includes((creditObj.spacialCreditID).split("-")[0])) {
                let personObj = {
                    "name": (creditObj.spacialCreditID).split("-")[0],
                    "userID": userID
                };
                creditObj.LendFrom = await addPersonData(personObj);
                creditObj.LendTo = null;
            }else{
                // We hve the person in DB
                creditObj.LendFrom = (creditObj.spacialCreditID).split("-")[0];
                creditObj.LendTo = null;
            }
            // Now insert data to Lend table
            creditObj.userID = userID;
            creditObj.lendID = await addLendDetails(creditObj);
            // console.log(creditObj.lendID);
        }
    }
    


    // return
    const creditID = crypto.randomBytes(10).toString("hex");
    let creaditInsertQuery = "INSERT INTO ?? (??, ??,??,??,??,??,??,??) VALUES (?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let prepareCerditQuery = mysql.format(creaditInsertQuery, ["Credit", "CreditID", "BankID", "UserID", "LendID", "Reason", "Date", "Amount", "Notes",
        creditID, creditObj.bankID, userID, creditObj.lendID, creditObj.creditReasonID, (creditObj.date).replaceAll("/","-"), creditObj.amount, creditObj.notes]);
    // console.log(prepareCerditQuery);
    await mysqlPool.execute(prepareCerditQuery);
}

module.exports = { addCreditDetails };