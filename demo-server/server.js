const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid'); 
const session = require('express-session');

//The session store will internally create a mysql connection pool which handles the (re)connection to the database.
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'emanuel',
    password: 'Emanux84',
    database: 'sessions_db'
};
var sessionStore = new MySQLStore(options);

//middleware
app.use(bodyParser.json());

//session middleware
app.use(session({
    genid: (req)=> {
        return uuid(); //or use genuuid() that comes with express-session
    },
    secret: 'super safe secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

//routes
app.get('/', (req, res)=> {
    res.send(`Home page.`);
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
})

// tell the server what port to listen on
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
});