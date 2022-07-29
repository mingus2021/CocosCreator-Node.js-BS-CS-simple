const mysql = require('mysql')
const config = require('./config').db

//连接数据库
// module.exports = mysql.createConnection(config)
//数据库连接池
module.exports = mysql.createPool(config)
