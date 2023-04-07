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
    let selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ? AND ?? <>? AND ?? <> ?";
    let prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["CreditReason", "UserID", userID, "UserID", null,"ID","098787651","ID","565434329"]);

    return (await mysqlPool.execute(prepareSelectReasonQuery))[0];
}

async function saveCreditReason(creditObj) {
    insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
    preapreQuery = mysql.format(insertQuery,["CreditReason","ID","Reason","UserID",creditObj.id,creditObj.reason,creditObj.userId]);
    // console.log(preapreQuery);
    await mysqlPool.execute(preapreQuery);
}

module.exports = {
    saveCreditReason,
    getCreditReason,
    getAllCreditReasonByUserId
}