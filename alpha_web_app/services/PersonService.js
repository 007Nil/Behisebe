const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function getPersonData(userID){
    selectPersonQuery = "SELECT * FROM ?? WHERE ?? = ?";
    prepareSelectPersonQuery = mysql.format(selectPersonQuery,["Person","UserID",userID]);

    let results = await mysqlPool.execute(prepareSelectPersonQuery);

    return results[0];
}

async function addPersonData(personObj){
    const personID = crypto.randomBytes(10).toString("hex");
    insetPersonQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)"
    prepareInsertPersonQuery = mysql.format(insetPersonQuery,["Person","ID","Name","UserID",
                                            personID,personObj.name,personObj.userID]);
    
    await mysqlPool.execute(prepareInsertPersonQuery);
    return personID;
}

async function getPersonNamebyID(personID){
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ?";
    prepareQuery = mysql.format(selectQuery,["Name","Person","ID", personID]);
    // console.log(prepareQuery)
    return (await mysqlPool.execute(prepareQuery))[0][0].Name;
}


module.exports = {getPersonData,addPersonData,getPersonNamebyID};