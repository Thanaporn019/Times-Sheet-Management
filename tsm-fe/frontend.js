const express = require('express');
const app = express();
const fs = require("fs");

const frontEndPort = process.env.FE_PORT || 5432;

app.use(express.static( __dirname + '/build'));

app.listen(frontEndPort, function () {
    console.log('frontEndPort app listening on port ' + frontEndPort + '!');
});
