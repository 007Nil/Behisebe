const crypto = require("crypto");
// Repos
const dailyCloisngCashRepo = require("../repository/DailyClosingCashRepo");

async function addDailyClosingCash(dailyClosingCashObj) {
    dailyClosingCashObj.id = crypto.randomBytes(10).toString("hex");
    let queryResult = await dailyCloisngCashRepo.findByPreviosDate(dailyClosingCashObj);
    if (typeof queryResult !== 'undefined' && queryResult.length > 0) {
        if (dailyClosingCashObj.isCredit) {
            dailyClosingCashObj.amount = parseInt(queryResult[0].Amount) + parseInt(dailyClosingCashObj.amount);
        } else {
            dailyClosingCashObj.amount = parseInt(queryResult[0].Amount) - parseInt(dailyClosingCashObj.amount);
        }
    }
    dailyCloisngCashRepo.addDailyCloisngCash(dailyClosingCashObj);

}

async function updateDailyClosingCash(dailyClosingCashObj) {
    // console.log("HIT")
    // console.log(dailyClosingCashObj);
    let queryResult = await dailyCloisngCashRepo.findByValues(dailyClosingCashObj);
    console.log(queryResult);
    if (typeof queryResult !== 'undefined' && queryResult.length > 0) {
        dailyClosingCashObj.id = queryResult[0].ID;
        if (dailyClosingCashObj.isCredit) {
            dailyClosingCashObj.amount = parseInt(queryResult[0].Amount) + parseInt(dailyClosingCashObj.amount);
        } else {
            dailyClosingCashObj.amount = parseInt(queryResult[0].Amount) - parseInt(dailyClosingCashObj.amount);
        }

        dailyCloisngCashRepo.updateDailyCashClosing(dailyClosingCashObj);
    } else {
        addDailyClosingCash(dailyClosingCashObj);
    }
}

module.exports = {
    updateDailyClosingCash
}