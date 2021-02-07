let express = require('express');
let router = express.Router();

// load controllers
const WorkController = require('./work');

router.use('/', WorkController);
module.exports = router;