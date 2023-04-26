const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function getAccountType() {
    // console.log("HIT");
    let selectAccountTypeQuery = "SELECT * FROM ??";
    let prepareAccountTypeQuery = mysql.format(selectAccountTypeQuery, ["BankAccountType"]);

    let queryResult = await mysqlPool.execute(prepareAccountTypeQuery);
    // console.log(queryResult[0]);
    return queryResult[0];
}



module.exports = {getAccountType};