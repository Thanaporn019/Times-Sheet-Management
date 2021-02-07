let express = require('express');
let router = express.Router();

// load controllers
const ProjectController = require('./project');

router.use('/', ProjectController);
module.exports = router;