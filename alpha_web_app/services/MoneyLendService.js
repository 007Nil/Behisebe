const crypto = require("crypto");
// Services
const { getPersonNamebyID } = require("./PersonService");
// delete require.cache[require.resolve("./CreditServices")];
const creditServices = require("./CreditServices");

// Repos
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



async function getLendFromData(userId) {
    let lendIDArray = new Array();
    // LendFrom == I borrow money from someone
    let lendFromArray = new Array();

    let returnData = []

    // addCreditDetails();
    let creditData = await creditServices.getCreditLendData(userId)
    console.log(creditData);

    let lendFromData = await lendRepo.getLendFromByUserID(userId);

    lendFromData.forEach(element => {
        lendFromArray.push(element.LendFrom);
        lendIDArray.push(element.ID);
    });
    lendFromArray = [...new Set(lendFromArray)];
    for (index in lendFromArray) {
        let lendDetails = {}
        let detailedLendDetails = []

        let lendFromPerosn = lendFromArray[index]

        for (lendDataindex in lendFromData) {

            if (lendFromPerosn === lendFromData[lendDataindex].LendFrom) {
                lendDetails = {
                    "LendFrom": await getPersonNamebyID(lendFromPerosn, userId),
                    "amount": 0
                };
                let detailsObj = {
                    "lendId": lendFromData[lendDataindex].ID,
                    "amount": 0,
                    "date": ""
                };
                detailedLendDetails.push(detailsObj);
            }

        }
        lendDetails.borrowDetails = detailedLendDetails
        returnData.push(lendDetails)
        // lendFromArray.pop()
        // lendFromData.pop(lendDataindex)
    }
    return returnData;
}

async function prepareLendToData(userID) {
    let lendToData = await getLendToByUserID(userID);

    for (index in lendToData) {
        lendToData[index].LendToName = await getPersonNamebyID(lendToData[index].LendTo);
    }

    return lendToData;

}

// module.exports.addLendDetails = addLendDetails;
// module.exports = { getLendByID, prepareLendToData, getLendFromData };
// export.getLendFromData = getLendFromData;

module.exports.addLendDetails = addLendDetails;
module.exports.getLendByID = getLendByID;
module.exports.prepareLendToData = prepareLendToData;
module.exports.getLendFromData = getLendByID;
module.exports.getLendFromData = getLendFromData;