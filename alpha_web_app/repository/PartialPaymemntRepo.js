const mysql = require("mysql2/promise");
const mysqlPool = require("../repository/MysqlConnectionPool");

function savePartialPayment(partialPaymentObj) {

}

async function getPartialPayment(lendId) {
    let query = "SELECT * FROM ?? WHERE ?? = ?";
    let prepareQuery = mysql.format(query, ["PartialPaymemnt", "LendId", lendId]);
    // console.log(prepareQuery);
    // console.log((await mysqlPool.execute(prepareQuery))[0])
    return (await mysqlPool.execute(prepareQuery ))[0];
}

module.exports = {
    getPartialPayment
};