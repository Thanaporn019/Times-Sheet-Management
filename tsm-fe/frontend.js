const express = require('express');
const app = express();
const fs = require("fs");

const frontEndPort = process.env.FE_PORT || 5001;

/* app.use(express.static( __dirname + '/build')); */

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

/*
const https = require('https');
const key = fs.readFileSync(__dirname + '/ssl/bluefin-portal-key.pem');
const cert = fs.readFileSync(__dirname + '/ssl/bluefin-portal-cert.pem');
const options = {
    key: key,
    cert: cert
};
*/
console.log('frontEndPort : ' + frontEndPort);
//https.createServer(options, app).listen(frontEndPort);


app.listen(frontEndPort, function () {
    console.log('frontEndPort app listening on port ' + frontEndPort + '!');
});
