const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");

async function addLend(lendObj){
    insertQuery = "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
    prepareQuery = mysql.format(insertQuery, ["Lend", "ID", "LendTo", "LendFrom", "FullPayment", "PartialPayID", "PaymentOnDate", "UserID",
    lendObj.id, lendObj.lendTo, lendObj.lendFrom, lendObj.fullPayment, lendObj.partialPaymentID, lendObj.paymentOnDate, lendObj.userId]);
    // console.log(prepareQuery)
    await mysqlPool.execute(prepareQuery);
}

async function getLendFromByUserID(userID) {
    selectQuery = "SELECT * FROM ?? WHERE ?? = ? AND ?? IS NOT ?";
    prepareQuery = mysql.format(selectQuery, ["Lend", "UserID", userID, "LendFrom", null]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

async function getLendToByUserID(userID) {
    selectQuery = "SELECT ??, ?? FROM ?? WHERE ?? = ? AND ?? IS NOT ?";
    prepareQuery = mysql.format(selectQuery, ["ID", "LendTo", "Lend", "UserID", userID, "LendTo", null]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

module.exports = {
    addLend,
    getLendFromByUserID,
    getLendToByUserID
}