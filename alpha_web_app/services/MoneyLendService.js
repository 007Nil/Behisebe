const crypto = require("crypto");
// Services
const { getPersonNamebyID } = require("./PersonService");
const creditServices = require("./CreditServices");
const partialPaymentService = require("./PartialPaymemntService");
const { getActiveLendData } = require("../services/ExpenseService");

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
    // console.log(creditData)
    // return;
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
                "LendFrom": await getPersonNamebyID(eachPerson, userId)
            };

            for (let eachLend of lendFromData) {
                if (eachPerson === eachLend.LendFrom) {
                    totalAmount += eachLend.Amount;
                    totalPaid += eachLend.PartialAmount;
                    let [creditId, amount, date, bankId, notes, reasonId] = getLendDetails(creditData, eachLend.ID);
                    // console.log(creditId)
                    let bankName = getBankName(bankDetails, bankId);
                    lendDetailsObj = {
                        "transacationId": creditId,
                        "lendId": eachLend.ID,
                        "alreadyPaid": eachLend.PartialAmount,
                        "bankId": bankId,
                        "bankName": bankName,
                        "amount": amount,
                        "date": date,
                        "notes": notes,
                        "reasonId": reasonId,
                        "partialPayment": await partialPaymentService.getPartialPayment(eachLend.ID)
                    }
                    detailedLendDetails.push(lendDetailsObj);
                    // console.log(lendDetailsObj)
                }
            }
            lendDetails.borrowDetails = detailedLendDetails;
            lendDetails.totalAmount = totalAmount;
            lendDetails.totalPaid = totalPaid;
            returnData.push(lendDetails)
        }

    }
    return returnData;
}

async function getLendToData(userId) {
    let lendIDArray = new Array();
    // LendFrom == I borrow money from someone
    let lendToArray = new Array();

    let returnData = []

    let debitData = await getActiveLendData(userId);

    if (debitData.length > 0) {
        let bankDetails = await bankRepo.getUserBankDetails(userId);
        let lendToData = await lendRepo.getLendToByUserID(userId);
        // console.log(lendToData)
        lendToData.forEach(element => {
            lendToArray.push(element.LendTo);
            lendIDArray.push(element.ID);
        });

        lendToPersons = [...new Set(lendToArray)];
        // console.log(lendToArray)
        for (let eachPerson of lendToPersons) {
            let lendDetails = {};
            let detailedLendDetails = [];
            let totalAmount = 0;
            let totalReceive = 0;
            
            lendDetails = {
                "personId": eachPerson,
                "LendTo": await getPersonNamebyID(eachPerson, userId)
            };
            for (let eachLend of lendToData) {
                
                if (eachPerson === eachLend.LendTo) {
                    totalAmount += eachLend.Amount;
                    totalReceive += eachLend.PartialAmount;
                    let [debitId, amount, date, bankId, notes, reasonId] = getLendDetails(debitData, eachLend.ID);
                    // console.log(debitId)
                    let bankName = getBankName(bankDetails, bankId);
                    lendDetailsObj = {
                        "transacationId": debitId,
                        "lendId": eachLend.ID,
                        "alreadyReceived": eachLend.PartialAmount,
                        "bankId": bankId,
                        "bankName": bankName,
                        "amount": amount,
                        "date": date,
                        "notes": notes,
                        "reasonId": reasonId,
                        "partialPayment": await partialPaymentService.getPartialPayment(eachLend.ID)
                    }
                    // console.log(lendDetailsObj)
                    detailedLendDetails.push(lendDetailsObj);
                }
            }
            lendDetails.OweDetails = detailedLendDetails;
            lendDetails.totalAmount = totalAmount;
            lendDetails.alreadyReceived = totalReceive;
            returnData.push(lendDetails)
        }
    }
    return returnData;
}

function getBankName(bankObj, bankId) {
    if (bankId) {
        // console.log(bankId)
        for (index in bankObj) {
            if (bankObj[index].BankID === bankId) {
                return bankObj[index].BankName;
            }
        }
    }

    return "By Cash"
}

function getLendDetails(transactionData, lendID) {
    // console.log(transactionData)

    for (eachData of transactionData) {
        let transactionId;
        if (eachData.LendID === lendID) {
            // console.log(eachData.CreditID)
            if (eachData.CreditID){
                // console.log("HIT")
                transacationId = eachData.CreditID;
            }else {
                // console.log("ELSE HIT")
                transacationId = eachData.ID
            }
            
            let amount = eachData.Amount;
            let date = eachData.Date;
            let bankId = eachData.BankID;
            let notes = eachData.Notes;
            let reason = eachData.Reason;
            return [transacationId, amount, date, bankId, notes, reason]
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

async function udpateLendTable(lendObj) {
    await lendRepo.udpateLendTable(lendObj)
}

async function getPartialPayAmount(lendId) {
    return (await lendRepo.getPartialPayAmount(lendId));
}

// module.exports.addLendDetails = addLendDetails;
// module.exports = { getLendByID, prepareLendToData, getLendFromData };
// export.getLendFromData = getLendFromData;

module.exports.addLendDetails = addLendDetails;
module.exports.getLendToByID = getLendToByID;
module.exports.prepareLendToData = prepareLendToData;
module.exports.getLendFromData = getLendFromData;
module.exports.getLendFromByID = getLendFromByID;
module.exports.udpateLendTable = udpateLendTable;
module.exports.getPartialPayAmount = getPartialPayAmount;
module.exports.getLendToData = getLendToData;
// module.exports.getLendFromData = getLendFromData;