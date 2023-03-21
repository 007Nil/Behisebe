const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");
const { getPersonNamebyID } = require("./PersonService");

async function addLendDetails(expenseObject) {
    const lendID = crypto.randomBytes(10).toString("hex");
    insertQuery = "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
    prepareQuery = mysql.format(insertQuery, ["Lend", "ID", "LendTo", "LendFrom", "FullPayment", "PartialPayID", "PaymentOnDate", "UserID",
        lendID, expenseObject.LendTo, expenseObject.LendFrom, 0, null, null, expenseObject.userID]);
    // console.log(prepareQuery)
    await mysqlPool.execute(prepareQuery);

    return lendID;
}

async function getLendByID(lendID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? ";
    prepareQuery = mysql.format(selectQuery, ["LendTo", "Lend", "ID", lendID]);
    return (await mysqlPool.execute(prepareQuery))[0][0].LendTo;

}

async function getLendFromByUserID(userID) {
    selectQuery = "SELECT ?? FROM ?? WHERE ?? = ? AND ?? IS NOT ?";
    prepareQuery = mysql.format(selectQuery, ["LendFrom", "Lend", "UserID", userID, "LendFrom", null]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

async function getLendToByUserID(userID) {
    selectQuery = "SELECT ??, ?? FROM ?? WHERE ?? = ? AND ?? IS NOT ?";
    prepareQuery = mysql.format(selectQuery, ["ID", "LendTo", "Lend", "UserID", userID, "LendTo", null]);
    // console.log(prepareQuery);
    return (await mysqlPool.execute(prepareQuery))[0];
}

async function prepareLendToData(userID) {
    let lendToData = await getLendToByUserID(userID);

    for (index in lendToData) {
        lendToData[index].LendToName = await getPersonNamebyID(lendToData[index].LendTo);
    }
    
    return lendToData;

}

module.exports = { addLendDetails, getLendByID, getLendFromByUserID, getLendToByUserID, prepareLendToData };