const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function addLendDetails(expenseObject) {
    const lendID = crypto.randomBytes(10).toString("hex");
    insertQuery = "INSERT INTO ?? (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
    prepareQuery = mysql.format(insertQuery, ["Lend", "ID", "LendTo","LendFrom", "FullPayment", "PartialPayID", "PaymentOnDate",
        lendID, expenseObject.LendTo,expenseObject.LendFrom, 0, null, null]);
    // console.log(prepareQuery)
    await mysqlPool.execute(prepareQuery);

    return lendID;
}

async function getLendByID(lendID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? ";
    prepareQuery = mysql.format(selectQuery, ["LendTo", "Lend", "ID", lendID]);
    return (await mysqlPool.execute(prepareQuery))[0][0].LendTo;

}

async function getLendFromByUserID(){
    selectQuery = "SELECT ?? FROM ?? WHERE ?? <> ?";
    prepareQuery = mysql.format(selectQuery,["LendFrom","Lend","LendFrom",null]);
    return (await mysqlPool.execute(prepareQuery))[0][0].LendFrom;
}

module.exports = { addLendDetails, getLendByID, };