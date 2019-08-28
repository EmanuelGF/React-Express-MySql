 const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'mysql_username',
  password : 'mysql_user_pass',
  database : 'db_name'
});
 
module.exports = db;