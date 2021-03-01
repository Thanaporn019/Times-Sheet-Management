let express = require('express');
let router = express.Router();

// load controllers
const JobController = require('./job');

router.use('/', JobController);
module.exports = router;