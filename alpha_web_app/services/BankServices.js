const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");
// get a connection from the pool

async function getAccountType(){
    let selectAccountTypeQuery = "SELECT * FROM ??";
    let prepareAccountTypeQuery = mysql.format(selectAccountTypeQuery,["BankAccountType"]);
    
    let queryResult = await mysqlPool.execute(prepareAccountTypeQuery);
    return queryResult[0];
}

async function fetchBankDetails(){
    let selectBanksQuery = "SELECT * FROM ??";
    let prepareSelectBankQuery = mysql.format(selectBanksQuery,["Bank"]);

    let queryResult = await mysqlPool.execute(prepareSelectBankQuery);
    return queryResult[0];
}

function getAccountCurrentBalance(){

}

async function addBankDetails(bankDetailsObject){
    const bankID = crypto.randomBytes(10).toString("hex");
    // const bankID = "3fd735e42cc59b907539";
    // Insert values in Bank table
    let bankDetailsInsertQuery = "INSERT INTO ?? (??,??,??,??, ??,??) VALUES (?,?,?,?,?,?)";
    let prepareBankQuery = mysql.format(bankDetailsInsertQuery,["Bank","BankID","BankName","AccountType","UserID","IsDefault","Notes",
                                bankID,bankDetailsObject.bankName,bankDetailsObject.bankAccountType,bankDetailsObject.userID, 0, bankDetailsObject.notes ]);
    // console.log(prepareBankQuery);
    await mysqlPool.execute(prepareBankQuery);

    // Add data to Creadit table
    const creditID = crypto.randomBytes(10).toString("hex");
    let creaditInsertQuery = "INSERT INTO ?? (??, ??,??) VALUES (?,?,?)";
    let prepareCerditQuery = mysql.format(creaditInsertQuery,["Credit","CreditID","BankID","Amount",
                                                            creditID,bankID,bankDetailsObject.bankBalance]);

    await mysqlPool.execute(prepareCerditQuery);
}

function makeBankInvalida(){
    
}

module.exports = { fetchBankDetails, addBankDetails, makeBankInvalida, getAccountType }