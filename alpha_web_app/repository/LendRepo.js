const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");

async function addLend(lendObj){
    insertQuery = "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
    prepareQuery = mysql.format(insertQuery, ["Lend", "ID", "LendTo", "LendFrom", "FullPayment", "PaymentOnDate", "UserID","Amount",
    lendObj.id, lendObj.lendTo, lendObj.lendFrom, lendObj.fullPayment, lendObj.paymentOnDate, lendObj.userId,lendObj.amount]);
    // console.log(prepareQuery)
    await mysqlPool.execute(prepareQuery);
}

async function getLendFromByUserID(userID) {
    selectQuery = "SELECT * FROM ?? WHERE ?? = ? AND ?? IS NOT ? AND ?? = ?";
    prepareQuery = mysql.format(selectQuery, ["Lend", "UserID", userID, "LendFrom", null,"FullPayment", 0]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

async function getLendToByUserID(userID) {
    selectQuery = "SELECT ??, ?? FROM ?? WHERE ?? = ? AND ?? IS NOT ?";
    prepareQuery = mysql.format(selectQuery, ["ID", "LendTo", "Lend", "UserID", userID, "LendTo", null]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

async function udpateLendTable(){
    
}

async function getLendToByID(lendID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? ";
    prepareQuery = mysql.format(selectQuery, ["LendTo", "Lend", "ID", lendID]);
    return (await mysqlPool.execute(prepareQuery))[0][0].LendTo;

}

async function getLendFromByID(lendID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? ";
    prepareQuery = mysql.format(selectQuery, ["LendFrom", "Lend", "ID", lendID]);
    // console.log(prepareQuery)
    return (await mysqlPool.execute(prepareQuery))[0][0].LendFrom;

}

module.exports = {
    addLend,
    getLendFromByUserID,
    getLendToByUserID,
    getLendToByID,
    getLendFromByID
}