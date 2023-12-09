const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");


async function getPartialPayment(lendId) {
    let query = "SELECT * FROM ?? WHERE ?? = ?";
    let prepareQuery = mysql.format(query, ["PartialPaymemnt", "LendId", lendId]);
    // console.log(prepareQuery);
    // console.log((await mysqlPool.execute(prepareQuery))[0])
    return (await mysqlPool.execute(prepareQuery ))[0];
}

async function savePartialPayment(partialPaymentObj){
    let query = "INSERT INTO ?? (??,??,??,??,??,??) VALUES (?,STR_TO_DATE(?,'%m-%d-%Y'),?,?,?,?)";
    let prepareQuery = mysql.format(query,["PartialPaymemnt","ID","OnDate","Amount","LendId","ByCash","BankId",
                                       partialPaymentObj.id,partialPaymentObj.onDate,partialPaymentObj.amount,partialPaymentObj.lendId,partialPaymentObj.bycash,partialPaymentObj.bankId]);
    
    await mysqlPool.execute(prepareQuery);

}
module.exports = {
    getPartialPayment,
    savePartialPayment
};