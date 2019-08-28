const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');

const PORT = process.env.PORT || 3002;

//middleware
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.send(`Home page.\n generating a uniqueID: ${uuid()}`);
})



app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
});