const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

async function findUserByEmail(userEmail){
    let selectUserQuery = "SELECT * FROM ?? WHERE Email = ?";
    let prepareSelectQuery = mysql.format(selectUserQuery,["User",userEmail]);

    let queryResult = await mysqlPool.execute(prepareSelectQuery);
    // console.log(queryResult);

    return queryResult[0];
}

module.exports = {findUserByEmail};