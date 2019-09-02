const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid'); 
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Mock userdata. Remember user data should be stored in actual database
//  the mysql conection is already set on /database folder.
const users = [{
    id: '001',
    name: 'userOne',
    email: 'test@test.com',
    password: 'test'
}];


//required middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport config (local strategie)
passport.use(new LocalStrategy( 
    {usernameField: 'email'},
    (email, password, done) => {
        const user = users[0]; // replace with call to database to find user!!
        if(email===user.email && password===user.password) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }
));

//This tells passport to save user id to the session store. 
passport.serializeUser((user, done) => {
    console.log('inside the serializer')
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    console.log('inside the DEserializer')
    const user = users[0].id === id ? users[0] : false; 
    done(null, user);
});


//The session store will internally create a mysql connection pool which handles the (re)connection to the database.
//Normally this would go in different js file.
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'emanuel',
    password: 'Emanux84',
    database: 'sessions_db'
};
var sessionStore = new MySQLStore(options);

//express session and passport session middleware
app.use(session({
    genid: (req)=> {
        return uuid(); //or use genuuid() that comes with express-session.
    },
    secret: 'f1w6e516sf6s1',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
    //Set an expiration date on the cookie!
}))

app.use(passport.initialize());
app.use(passport.session());


//Routes

//Send confirmation of user authentication and also, user data.
app.get('/logged_in', (req, res)=> {
    if(req.user){ //If there is a user set by session
        return res.send({
            logged_in: true, 
            username: req.user.name
        }); 
    } else {
        return res.send({
            logged_in: false
        });
    }
});

//Handle login post
app.post(
    '/loginform',
    function (req, res, next) {
        console.log(' login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in: ', req.user.name);
        res.status(200).send(req.user.name);
    }
)

//Handle the logout
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    console.log('logged out');
    res.status(200).send();
});


// tell the server what port to listen on
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
});