const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function saveCreditReason(creditReasonObj) {
    insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
    preapreQuery = mysql.format(insertQuery, ["CreditReason", "ID", "Reason", "UserID", reasonID, reasonObj.creditReason, reasonObj.userID]);

    await mysqlPool.execute(preapreQuery);
}

async function getCreditReason(userID) {
    selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ?";
    prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["CreditReason", "UserID", userID, "UserID", null]);

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
    getCreditReason
}