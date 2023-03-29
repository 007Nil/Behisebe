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
                console.log(lendFromData[lendDataindex])
                lendDetails = {
                    "personId": lendFromPerosn,
                    "LendFrom": await getPersonNamebyID(lendFromPerosn, userId),
                    "totalAmount": 0
                };
                let [creditId,amount, date, bankId, notes, reasonId] = getLendDetails(creditData, lendFromData[lendDataindex].ID);
                totalAmount += amount;
                let detailsObj = {
                    "transacationId": creditId,
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

function getLendDetails(transactionData, lendID) {
    // console.log(transactionData)
    for (indexData in transactionData) {
        // console.log(creditData[indexData]);
        if (transactionData[indexData].LendID === lendID) {
            // console.log(transactionData[indexData]);
            let creditId = transactionData[indexData].CreditID;
            // if (key === "amount") {
            let amount = transactionData[indexData].Amount;
            // } else if (key === "date") {
            let date = transactionData[indexData].Date;
            // } else if (key === "bankId") {
            let bankId = transactionData[indexData].BankID;
            // } else if (key === "notes") {
            let notes = transactionData[indexData].Notes;
            // } else if (key === "reason") {
            let reason = transactionData[indexData].Reason;
            // }
            return [creditId,amount, date, bankId, notes, reason]
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