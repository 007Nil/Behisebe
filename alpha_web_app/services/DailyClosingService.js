const crypto = require("crypto");
const dailyClosingRepo = require("../repository/DailyClosingRepo");

function addDailyCloisng(dailyClosingObj){
    dailyClosingObj.id = crypto.randomBytes(10).toString("hex");
    dailyClosingRepo.addDailyCloisng(dailyClosingObj);
}

module.exports = {
    addDailyCloisng
}