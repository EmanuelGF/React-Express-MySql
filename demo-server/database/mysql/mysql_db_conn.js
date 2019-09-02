//This is a connection to a mysql db where you would persist the user related data like password, name, role etc...

const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'mysql_user',
  password : 'mysql_user_pass',
  database : 'db_name'
});
 
module.exports = db;