const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");


function addDailyCloisngCash(dailyClosingCashObj) {
    let query = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,STR_TO_DATE(?,'%m-%d-%Y'),?)";
    let preapreQuery = mysql.format(query, ["DailyClosingCash", "ID", "Amount", "Date", "UserId",
        dailyClosingCashObj.id, dailyClosingCashObj.amount, dailyClosingCashObj.date, dailyClosingCashObj.userId]);
    mysqlPool.execute(preapreQuery);
}

function updateDailyCashClosing(dailyClosingCashObj) {
    // console.log(dailyClosingCashObj);
    let query = "UPDATE ?? SET ?? = ? WHERE ?? = ?"
    let prepareQuery = mysql.format(query, ["DailyClosingCash", "Amount", dailyClosingCashObj.amount, "ID", dailyClosingCashObj.id]);

    mysqlPool.execute(prepareQuery);

}

async function findByValues(dailyClosingCashObj) {
    let query = "SELECT ??,?? FROM ?? WHERE ?? = ? AND ?? = STR_TO_DATE(?,'%m-%d-%Y')"
    let preapreQuery = mysql.format(query, ["ID", "Amount", "DailyClosingCash", "UserId", dailyClosingCashObj.userId, "Date", dailyClosingCashObj.date]);

    return (await mysqlPool.execute(preapreQuery))[0];
}

async function findByPreviosDate(dailyClosingCashObj) {
    let query = "SELECT ??,?? FROM ?? WHERE ?? = ? AND ?? = DATE_SUB(STR_TO_DATE(?,'%m-%d-%Y'),INTERVAL 1 DAY)"
    let preapreQuery = mysql.format(query, ["ID", "Amount", "DailyClosing", "UserId", dailyClosingCashObj.userId, "Date", dailyClosingCashObj.date]);

    // console.log(preapreQuery);

    return (await mysqlPool.execute(preapreQuery))[0];
}

async function getDailyCashClosing(dailyClosingCashObj){
    let query = "SELECT ?? FROM ?? WHERE ?? = ? AND ?? = STR_TO_DATE(?,'%m-%d-%Y')";
    let prepareQuery = mysql.format(query,["Amount","DailyClosingCash","UserId",dailyClosingCashObj.userId,"Date",dailyClosingCashObj.date]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0][0];
}

module.exports = {
    findByValues,
    updateDailyCashClosing,
    addDailyCloisngCash,
    findByPreviosDate,
    getDailyCashClosing
}