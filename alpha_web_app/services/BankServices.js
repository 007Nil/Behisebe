const mysql = require("mysql2/promise");
const mysqlPool = require("./MysqlConnectionPool");
const crypto = require("crypto");
// get a connection from the pool

function fetchBankDetails(){

}

async function addBankDetails(bankDetailsObject){
    const bankID = crypto.randomBytes(10).toString("hex");
    // const bankID = "3fd735e42cc59b907539";
    // Insert values in Bank table
    let bankDetailsInsertQuery = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
    let prepareBankQuery = mysql.format(bankDetailsInsertQuery,["Bank","BankID","BankName","IsDefault","Notes",
                                bankID,bankDetailsObject.bankNmae, 0, bankDetailsObject.notes ]);
    await mysqlPool.execute(prepareBankQuery)
    
}

function makeBankInvalida(){
    
}

module.exports = { fetchBankDetails, addBankDetails, makeBankInvalida }