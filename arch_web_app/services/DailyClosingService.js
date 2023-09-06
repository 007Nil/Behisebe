const crypto = require("crypto");
const dailyClosingRepo = require("../repository/DailyClosingRepo");
// Models
const dailyClosingModel = require("../model/DailyClosingModel");

async function addDailyCloisng(dailyClosingObj) {
    dailyClosingObj.id = crypto.randomBytes(10).toString("hex");
    // Search the data for previos date with bankID and user Id
    // If found then add a new row with udpated date and calculate the amount
    // Else -> this means 1st entry the bank, so it the query
    // Returns emply list add the now.
    let queryResult = await dailyClosingRepo.findByPreviosDate(dailyClosingObj);
    if (typeof queryResult !== 'undefined' && queryResult.length > 0) {
        if (dailyClosingObj.isCredit) {
            dailyClosingObj.amount = parseInt(queryResult[0].Amount) + parseInt(dailyClosingObj.amount);
        } else {
            dailyClosingObj.amount = parseInt(queryResult[0].Amount) - parseInt(dailyClosingObj.amount);
        }

    }
    dailyClosingRepo.addDailyCloisng(dailyClosingObj);
}

async function updateDailyClosing(dailyClosingObj) {
    // Search with the current date and user Id and bank Id
    // If any result found the udpate the row
    // Else call addDailyCloisng
    queryResult = await dailyClosingRepo.findByValues(dailyClosingObj);
    if (typeof queryResult !== 'undefined' && queryResult.length > 0) {
        dailyClosingObj.id = queryResult[0].ID;
        if (dailyClosingObj.isCredit) {
            dailyClosingObj.amount = parseInt(queryResult[0].Amount) + parseInt(dailyClosingObj.amount);
        } else {
            dailyClosingObj.amount = parseInt(queryResult[0].Amount) - parseInt(dailyClosingObj.amount);
        }

        dailyClosingRepo.updateDailyClosing(dailyClosingObj);
    } else {
        addDailyCloisng(dailyClosingObj);
    }

}

async function getDailyClosing(requestData) {
    let dailyCloisngObj = new dailyClosingModel();
    dailyCloisngObj.bankId = requestData.bankId;
    dailyCloisngObj.date = requestData.date.replaceAll("/", "-");
    dailyCloisngObj.userId = requestData.userId;

    return await dailyClosingRepo.getDailyClosing(dailyCloisngObj);
}

module.exports = {
    updateDailyClosing,
    getDailyClosing
}