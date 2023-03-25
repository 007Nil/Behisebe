const crypto = require("crypto");
// Repos
const personRepo = require("../repository/PersonRepo");

async function getPersonDataByUserId(userID) {
    return (await personRepo.getPersonByUserId(userID));
}

async function addPersonData(personObj) {
    personObj.id = crypto.randomBytes(10).toString("hex");
    await personRepo.savePerson(personObj)
    return personObj.id;
}

async function getPersonNamebyID(personID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ?";
    prepareQuery = mysql.format(selectQuery, ["Name", "Person", "ID", personID]);
    // console.log(prepareQuery)
    return (await mysqlPool.execute(prepareQuery))[0][0].Name;
}


module.exports = { getPersonDataByUserId, addPersonData, getPersonNamebyID };