var express = require('express');
var path = require('path');
var app = express();

// app.get('/api/youtube', function(req, res){
//     res.json({youtube: "555", meessage: "get"});
// });

// app.post('/api/youtube', function(req, res){
//     res.json({youtube: "555", meessage: "post"});
// });

app.route('/api/youtube').get (function(req, res){

    res.json({youtube: "555", meessage: "get"});

}).post(function(req, res){
    res.json({youtube: "555", meessage: "post"});

}).delete(function(req, res){
    res.json({youtube: "555", meessage: "delete"});

}).put(function(req, res){
    res.json({youtube: "555", meessage: "put"});
})



// open port
app.listen(7000, function(){
    console.log("restful index is running..")

});