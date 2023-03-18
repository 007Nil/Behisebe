const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function getCreditReason(userID) {
    selectReasonQuery = "SELECT * FROM ?? WHERE ?? = ? OR ?? IS ? AND ?? <> ?";
    prepareSelectReasonQuery = mysql.format(selectReasonQuery, ["CreditReason", "UserID", userID, "UserID", null,"Reason","Added Bank Details"]);
    // console.log(prepareSelectReasonQuery);
    return (await mysqlPool.execute(prepareSelectReasonQuery))[0];
}

module.exports = { getCreditReason }