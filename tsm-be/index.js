const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./connect");

// middleware
app.use(cors());
app.use(express.json());

app.get('/user',(req, res) => {

    res.end('HELLO')
})
// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res) 
//     pool.end() 
//   })
// open port
app.listen(5000, () => {
    console.log("sever has started on port 5000");

});