const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./connect");

// middleware
app.use(cors());
app.use(express.json());

app.get('/user',(req, res) => {
// 
// 
// / SQL
// DATA = {}
pool.query('SELECT NOW()', (err, resp) => {
    console.log(err, resp) 
    res.end(resp)
    pool.end() 
  })
})
// open port
app.listen(5000, () => {
    console.log("sever has started on port 5000");

});