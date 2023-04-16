const crypto = require("crypto");
// Services
const { getPersonNamebyID } = require("./PersonService");
// delete require.cache[require.resolve("./CreditServices")];
const creditServices = require("./CreditServices");
const partialPaymentService = require("./PartialPaymemntService");

// Repos
const lendRepo = require("../repository/LendRepo");
const bankRepo = require("../repository/BankRepo");



async function addLendDetails(lendObj) {
    lendObj.id = crypto.randomBytes(10).toString("hex");

    await lendRepo.addLend(lendObj)
    return lendObj.id;
}

async function getLendToByID(lendID) {
    return lendRepo.getLendToByID(lendID)

}

async function getLendFromByID(lendID) {
    return lendRepo.getLendFromByID(lendID)

}

async function udpateLendData() {

}

async function getLendFromData(userId) {
    let lendIDArray = new Array();
    // LendFrom == I borrow money from someone
    let lendFromArray = new Array();

    let returnData = []

    let creditData = await creditServices.getActiveLendData(userId);
    // console.log(creditData);

    if (creditData.length > 0) {
        let bankDetails = await bankRepo.getUserBankDetails(userId);
        let lendFromData = await lendRepo.getLendFromByUserID(userId);

        lendFromData.forEach(element => {
            lendFromArray.push(element.LendFrom);
            lendIDArray.push(element.ID);
        });
        // Set gives unique elements

        lendFromPersons = [...new Set(lendFromArray)];
        // console.log(lendFromPersons)
        for (let eachPerson of lendFromPersons) {

            let lendDetails = {};
            let detailedLendDetails = [];
            let totalAmount = 0;
            let totalPaid = 0;
            lendDetails = {
                "personId": eachPerson,
                "LendFrom": await getPersonNamebyID(eachPerson, userId),
                "totalAmount": totalAmount,
                "totalPaid": totalPaid
            };
            for (let eachLend of lendFromData){
                if (eachPerson === eachLend.LendFrom) {
                    console.log(lendFromData)
                    let partialPaymentDetails = await partialPaymentService.getPartialPayment(eachLend.ID);
                    // console.log(partialPaymentDetails)
                }
            }

            // console.log(lendDetails)
        }
        // for (let eachLend of lendFromData) {
        // console.log(eachLend)

        // let lendDetails = {
        //     "personId": eachLend.LendFrom,
        //     "LendFrom": await getPersonNamebyID(eachLend.LendFrom, userId),
        //     // "totalAmount": totalAmount,
        //     // "totalPaid": totalPaid
        // }
        // console.log(lendDetails)
        // }
        return
    } else {
        return returnData;
    }

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
        let totalPaid = 0;
        for (eachLendData of lendFromData) {
            // console.log(lendFromDataeachLendData.ID)
            if (lendFromPerosn === lendFromData.LendFrom) {
                let partialPaymentDetails = await partialPaymentService.getPartialPayment(eachLendData.ID);
                // console.log(partialPaymentDetails);
                lendDetails = {
                    "personId": lendFromPerosn,
                    "LendFrom": await getPersonNamebyID(lendFromPerosn, userId),
                    "totalAmount": totalAmount,
                    "totalPaid": totalPaid
                };
                let [creditId, amount, date, bankId, notes, reasonId] = getLendDetails(creditData, eachLendData.ID);
                let bankName = getBankName(bankDetails, bankId);
                // console.log(bankName)
                totalAmount += amount;
                let detailsObj = {
                    "transacationId": creditId,
                    "lendId": eachLendData.ID,
                    "bankId": bankId,
                    "bankName": bankName,
                    "amount": amount,
                    "date": date,
                    "notes": notes,
                    "reasonId": reasonId,
                    "partialPayment": partialPaymentDetails
                };
                if (partialPaymentDetails.length > 0) {
                    for (eachPartitalPayment of partialPaymentDetails) {

                    }
                }

                detailedLendDetails.push(detailsObj);
            }
            lendDetails.totalAmount = totalAmount;
            // lendDetails.

            // console.log("HIT")

        }
        lendDetails.borrowDetails = detailedLendDetails
        returnData.push(lendDetails)
    }
    return returnData;
}

function getBankName(bankObj, bankId) {
    for (index in bankObj) {
        if (bankObj[index].BankID === bankId) {
            return bankObj[index].BankName;
        }
    }
    return "By Cash"
}

function getLendDetails(transactionData, lendID) {
    console.log(transactionData)
    for (eachData of transactionData) {
        if (eachData.LendID === lendID) {
            let creditId = eachData.CreditID;
            let amount = eachData.Amount;
            let date = eachData.Date;
            let bankId = eachData.BankID;
            let notes = eachData.Notes;
            let reason = eachData.Reason;
            return [creditId, amount, date, bankId, notes, reason]
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
module.exports.getLendToByID = getLendToByID;
module.exports.prepareLendToData = prepareLendToData;
module.exports.getLendFromData = getLendFromData;
module.exports.getLendFromByID = getLendFromByID;
// module.exports.getLendFromData = getLendFromData;