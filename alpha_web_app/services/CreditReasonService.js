const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function getCreditReason(userID) {
    selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ?";
    prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["CreditReason", "UserID", userID, "UserID", null]);
    // console.log(prepareSelectReasonQuery);
    return (await mysqlPool.execute(prepareSelectReasonQuery))[0];
}

async function addCreditReason(reasonObj){
    const reasonID = crypto.randomBytes(10).toString("hex");
    insertQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
    preapreQuery = mysql.format(insertQuery,["CreditReason","ID","Reason","UserID",reasonID,reasonObj.creditReason,reasonObj.userID]);
    console.log(preapreQuery);
    await mysqlPool.execute(preapreQuery);

    return reasonID;
}

module.exports = { getCreditReason, addCreditReason }