const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");

async function addLendDetails(lendToID) {
    const lendID = crypto.randomBytes(10).toString("hex");
    insertQuery = "INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)";
    prepareQuery = mysql.format(insertQuery, ["Lend", "ID", "LendTo", "FullPayment", "PartialPayID", "PaymentOnDate",
        lendID, lendToID, 0, null, null]);

    await mysqlPool.execute(prepareQuery);

    return lendID;
}

async function getLendByID(lendID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? ";
    prepareQuery = mysql.format(selectQuery, ["LendTo", "Lend", "ID", lendID]);
    return (await mysqlPool.execute(prepareQuery))[0][0].LendTo

}

module.exports = { addLendDetails, getLendByID };