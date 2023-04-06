const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");

function addDailyCloisng(dailyClosingObj){
    let query = "INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,STR_TO_DATE(?,'%m-%d-%Y'),?,?)";
    let preapreQuery = mysql.format(query,["DailyClosing","ID","Amount","Date","BankId","UserId",
                                        dailyClosingObj.id,dailyClosingObj.amount,dailyClosingObj.date,dailyClosingObj.bankId,dailyClosingObj.userId]);
    mysqlPool.execute(preapreQuery);
}

function updateDailyClosing (dailyClosingObj){
    console.log("I am HIT");

}

async function findByValues(dailyClosingObj){
    let query = "SELECT ??,?? FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = STR_TO_DATE(?,'%m-%d-%Y')"
    let preapreQuery = mysql.format(query, ["ID","Amount","DailyClosing", "BankId", dailyClosingObj.bankId,
                                            "UserId",dailyClosingObj.userId,"Date",dailyClosingObj.date]);
    
    return (await mysqlPool.execute(preapreQuery))[0];
}

async function findByPreviosDate(dailyClosingObj){
    let query = "SELECT ??,?? FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = DATE_SUB(STR_TO_DATE(?,'%m-%d-%Y'),INTERVAL 1 DAY)"
    let preapreQuery = mysql.format(query, ["ID","Amount","DailyClosing", "BankId", dailyClosingObj.bankId,
                                            "UserId",dailyClosingObj.userId,"Date",dailyClosingObj.date]);
    
    // console.log(preapreQuery);
    
    return (await mysqlPool.execute(preapreQuery))[0];
}


module.exports = {
    addDailyCloisng,
    updateDailyClosing,
    findByValues,
    findByPreviosDate
};