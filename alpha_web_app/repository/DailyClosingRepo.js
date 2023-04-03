const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
// this.id = id;
// this.date = date;
// this.amount = amount;
// this.bankId = bankId;

// ID VARCHAR(255) NOT NULL UNIQUE,
// DATE DATE,
// Amount INT,
// BankId VARCHAR(255) NOT NULL,
function addDailyCloisng(dailyClosingObj){
    let query = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,STR_TO_DATE(?,'%m-%d-%Y'),?)";
    preapreQuery = mysql.format(query,["DailyClosing","ID","Amount","Date","BankId",
                                        dailyClosingObj.id,dailyClosingObj.amount,dailyClosingObj.date,dailyClosingObj.bankId]);
    mysqlPool.execute(preapreQuery);
}

module.exports = {
    addDailyCloisng
};