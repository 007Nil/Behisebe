const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");

async function getPersonByUserId(userID) {
    selectPersonQuery = "SELECT * FROM ?? WHERE ?? = ?";
    prepareSelectPersonQuery = mysql.format(selectPersonQuery, ["Person", "UserID", userID]);

    return (await mysqlPool.execute(prepareSelectPersonQuery))[0];
}

async function savePerson(personObj) {
    insetPersonQuery = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)"
    prepareInsertPersonQuery = mysql.format(insetPersonQuery, ["Person", "ID", "Name", "UserID",
        personObj.id, personObj.name, personObj.userId]);

    await mysqlPool.execute(prepareInsertPersonQuery);
}

async function getPersonNamebyID(personId,userId) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?";
    prepareQuery = mysql.format(selectQuery, ["Name", "Person", "ID", personId,"userID",userId]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0][0].Name;
}
module.exports = {
    getPersonByUserId,
    savePerson,
    getPersonNamebyID
}