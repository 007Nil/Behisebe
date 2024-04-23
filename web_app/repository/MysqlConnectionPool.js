const mysql = require('mysql2/promise');
require('dotenv').config()

const pool = mysql.createPool({
    connectionLimit: 100, //important
    host: process.env.MysqlServer,
    user: process.env.MysqlUser,
    password: process.env.MysqlPassword,
    database: process.env.MysqlDatabase,
    debug: false
});

module.exports = pool;