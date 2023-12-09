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

async function getPersonNamebyID(personID,userId) {
 return (await personRepo.getPersonNamebyID(personID,userId));
}


module.exports = { getPersonDataByUserId, addPersonData, getPersonNamebyID };