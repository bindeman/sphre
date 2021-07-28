const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var enforce = require('express-sslify');

// require('dotenv').config();





const app = express();


//bodyparser
app.use(bodyParser.json());

enforce.HTTPS({ trustProtoHeader: true })

//DB config
// console.log(process.env.DATABASE);
// const db = require('./config/keys').mongoURI;


//Served compiled static React content in production
if (process.env.NODE_ENV === 'production') {
    //serve static files generated by React
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

