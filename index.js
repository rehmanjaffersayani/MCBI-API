var express = require('express');
var bodyParser = require('body-parser');

var router = require('./routes')();
var cors = require('cors');


var app = express();

var port = process.env.port || 3300

app.listen(port, () => {
    console.log("Hi This port is running"+port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api', router);
