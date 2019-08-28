const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3002;

//middleware
app.use(bodyParser.json());


app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
});