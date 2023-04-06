const crypto = require("crypto");
const dailyClosingRepo = require("../repository/DailyClosingRepo");

async function addDailyCloisng(dailyClosingObj) {
    dailyClosingObj.id = crypto.randomBytes(10).toString("hex");
    // Search the data for previos date with bankID and user Id
    // If found then add a new row with udpated date and calculate the amount
    // Else -> this means 1st entry the bank, so it the query
    // Returns emply list add the now.
    let queryResult = await dailyClosingRepo.findByPreviosDate(dailyClosingObj);
    console.log(queryResult)
    if (typeof queryResult !== 'undefined' && queryResult.length > 0) {
        // console.log(queryResult);
        // console.log("I am HIT FROM IF");
        dailyClosingObj.amount = parseInt(queryResult[0].Amount) + parseInt(dailyClosingObj.amount);
    }
    // console.log("AFter HIT")
    console.log(dailyClosingObj);
    dailyClosingRepo.addDailyCloisng(dailyClosingObj);
}

async function updateDailyClosing(dailyClosingObj) {
    // Search with the current date and user Id and bank Id
    // If any result found the udpate the row
    // Else call addDailyCloisng
    queryResult = await dailyClosingRepo.findByValues(dailyClosingObj);
    if (typeof queryResult !== 'undefined' && queryResult.length > 0) {
        // We have data
        // console.log(queryResult);
        dailyClosingObj.id = queryResult.ID;
        dailyClosingObj.amount = queryResult.amount + dailyClosingObj.amount;
        dailyClosingRepo.updateDailyClosing(dailyClosingObj);
    } else {
        addDailyCloisng(dailyClosingObj);
    }

}

module.exports = {
    updateDailyClosing
}