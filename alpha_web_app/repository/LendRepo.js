const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");

async function addLend(lendObj){
    insertQuery = "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
    prepareQuery = mysql.format(insertQuery, ["Lend", "ID", "LendTo", "LendFrom", "FullPayment", "PartialPayID", "PaymentOnDate", "UserID",
    lendObj.id, lendObj.lendTo, lendObj.lendFrom, lendObj.fullPayment, lendObj.partialPaymentID, lendObj.paymentOnDate, lendObj.userId]);
    // console.log(prepareQuery)
    await mysqlPool.execute(prepareQuery);
}

module.exports = {
    addLend
}