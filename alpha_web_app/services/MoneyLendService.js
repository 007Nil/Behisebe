const crypto = require("crypto");
// Services
const { getPersonNamebyID } = require("./PersonService");
// delete require.cache[require.resolve("./CreditServices")];
const creditServices = require("./CreditServices");

// Repos
const lendRepo = require("../repository/LendRepo");
const { copyFileSync } = require("fs");



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
    // console.log(creditData);

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
        let totalAmount = 0;
        for (lendDataindex in lendFromData) {

            if (lendFromPerosn === lendFromData[lendDataindex].LendFrom) {

                lendDetails = {
                    "LendFrom": await getPersonNamebyID(lendFromPerosn, userId),
                    "totalAmount": 0
                };
                let bankId = getLendDetails(creditData, lendFromData[lendDataindex].ID, "bankId");
                let amount = getLendDetails(creditData, lendFromData[lendDataindex].ID, "amount");
                let date = getLendDetails(creditData, lendFromData[lendDataindex].ID, "date");
                let notes = getLendDetails(creditData, lendFromData[lendDataindex].ID, "notes");
                let reasonId = getLendDetails(creditData, lendFromData[lendDataindex].ID, "reason");
                // let reasonName = getLendDetails(creditData, lendFromData[lendDataindex].ID, "reason");
                totalAmount += amount;
                let detailsObj = {
                    "lendId": lendFromData[lendDataindex].ID,
                    "bankID": bankId,
                    "bankName": "",
                    "amount": amount,
                    "date": date,
                    "notes": notes,
                    "reasonId": reasonId,
                    "reasonName": ""
                };
                detailedLendDetails.push(detailsObj);

            }
            lendDetails.totalAmount = totalAmount;



        }
        lendDetails.borrowDetails = detailedLendDetails
        returnData.push(lendDetails)
        // lendFromArray.pop()
        // lendFromData.pop(lendDataindex)
    }
    // console.log("HIT");
    return returnData;
}

function getchBankName() {

}

function getLendDetails(transactionData, lendID, key) {
    // console.log(transactionData)
    for (indexData in transactionData) {
        // console.log(creditData[indexData]);
        if (transactionData[indexData].LendID === lendID) {
            if (key === "amount") {
                return transactionData[indexData].Amount;
            } else if (key === "date") {
                return transactionData[indexData].Date;
            } else if (key === "bankId") {
                return transactionData[indexData].BankID;
            } else if (key === "notes") {
                return transactionData[indexData].Notes;
            } else if (key === "reason") {
                return transactionData[indexData].Reason;
            }
        }
    }
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