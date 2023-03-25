const crypto = require("crypto");
const { getPersonNamebyID } = require("./PersonService");
const lendRepo = require("../repository/LendRepo");
async function addLendDetails(lendObj) {
    lendObj.id = crypto.randomBytes(10).toString("hex");

    await lendRepo.addLend(lendObj)
    return lendObj.id;
}

async function getLendByID(lendID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? ";
    prepareQuery = mysql.format(selectQuery, ["LendTo", "Lend", "ID", lendID]);
    return (await mysqlPool.execute(prepareQuery))[0][0].LendTo;

}

async function getLendFromByUserID(userID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? AND ?? IS NOT ?";
    prepareQuery = mysql.format(selectQuery, ["LendFrom", "Lend", "UserID", userID, "LendFrom", null]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

async function getLendToByUserID(userID) {
    selectQuery = "SELECT ??, ?? FROM ?? WHERE ?? = ? AND ?? IS NOT ?";
    prepareQuery = mysql.format(selectQuery, ["ID", "LendTo", "Lend", "UserID", userID, "LendTo", null]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

async function prepareLendToData(userID) {
    let lendToData = await getLendToByUserID(userID);

    for (index in lendToData) {
        lendToData[index].LendToName = await getPersonNamebyID(lendToData[index].LendTo);
    }
    
    return lendToData;

}

module.exports = { addLendDetails, getLendByID, getLendFromByUserID, getLendToByUserID, prepareLendToData };