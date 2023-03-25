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
        personObj.id, personObj.name, personObj.userID]);

    await mysqlPool.execute(prepareInsertPersonQuery);
}

module.exports = {
    getPersonByUserId,
    savePerson
}