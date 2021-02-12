const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./connect");
const conf = require('./utils/config');
const apiUrlPrefix = conf.get('apiUrlPrefix');
const appIp = (process.env.HOST_IP) ? process.env.HOST_IP : conf.get('appIp');
const appPort = (process.env.HOST_PORT) ? process.env.HOST_PORT : conf.get('appPort');
// middleware
app.use(cors());
app.use(express.json());

app.set('ip', appIp);
app.set('port', appPort);

// app.get('/user', (req, res) => {
//   // 
//   // 
//   // / SQL
//   // DATA = {}
//   pool.query('SELECT NOW()', (err, resp) => {
//     console.log(err, resp)
//     res.end(resp)
//     pool.end()
//   })
// })

app.use(apiUrlPrefix + '/type', require('./controllers/job/index'))
app.use(apiUrlPrefix + '/project', require('./controllers/project/index'))
app.use(apiUrlPrefix + '/work', require('./controllers/work/index'))

// open port
app.listen(appPort, () => {
  console.log(`> Ready on http://${appIp}:${appPort}`);
});