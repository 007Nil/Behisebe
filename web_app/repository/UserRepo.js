const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");

async function findUserByEmail(userEmail) {
    let selectUserQuery = "SELECT * FROM ?? WHERE Email = ?";
    let prepareSelectQuery = mysql.format(selectUserQuery, ["User", userEmail]);

    let queryResult = await mysqlPool.execute(prepareSelectQuery);
    // console.log(queryResult[0]);

    return queryResult[0];
}

async function addUser(userObj){
    let query = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
    let prepareQuery = mysql.format(query,["User","ID","FirstName","LastName","Email",userObj.id,userObj.firstName,userObj.lastName,userObj.email]);

    await mysqlPool.execute(prepareQuery);
}

module.exports = {
    findUserByEmail,
    addUser
}