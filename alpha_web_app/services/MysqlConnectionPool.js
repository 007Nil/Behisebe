const mysql = require('mysql2/promise');
const mysqlParam =  require("./ReadConfig");

const pool = mysql.createPool({
    connectionLimit: 100, //important
    host: mysqlParam.MysqlServer,
    user: mysqlParam.MysqlUser,
    password: mysqlParam.MysqlPassword,
    database: mysqlParam.MysqlDatabase,
    debug: false
});