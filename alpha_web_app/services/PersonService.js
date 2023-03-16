const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function getPersonData(userID){
    selectPersonQuery = "SELECT * FROM ?? WHERE ?? = ?";
    prepareSelectPersonQuery = mysql.format(selectPersonQuery,["Person","UserID",userID]);

    let results = await mysqlPool.execute(prepareSelectPersonQuery);

    return results[0];
}

async function addPersonData(userID){
    
}


module.exports = {getPersonData,addPersonData};