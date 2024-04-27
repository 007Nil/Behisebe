const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveCreditReason(creditReasonObj) {
    insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
    preapreQuery = mysql.format(insertQuery, ["CreditReason", "ID", "Reason", "UserID", reasonID, reasonObj.creditReason, reasonObj.userID]);

    await mysqlPool.execute(preapreQuery);
}

async function getAllCreditReasonByUserId(userId){
    let selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ?";
    let prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["CreditReason", "UserID", userId, "UserID", null]);

    return (await mysqlPool.execute(prepareSelectReasonQuery))[0];
}

async function getCreditReason(userID) {
    let selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ? AND ?? = ?";
    let prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["CreditReason", "UserID", userID, "UserID", null, "isVisable", 1]);
    console.log(prepareSelectReasonQuery);

    return (await mysqlPool.execute(prepareSelectReasonQuery))[0];
}

async function saveCreditReason(creditObj) {
    insertQuery = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
    preapreQuery = mysql.format(insertQuery,["CreditReason","ID","Reason","UserID","isVisable",creditObj.id,creditObj.reason,creditObj.userId,1]);
    // console.log(preapreQuery);
    await mysqlPool.execute(preapreQuery);
}

module.exports = {
    saveCreditReason,
    getCreditReason,
    getAllCreditReasonByUserId
}