const nodeEnv = process.env.NODE_ENV || 'default';
const NodeJsonConfig = require('node-json-config');
const conf = new NodeJsonConfig(__dirname + '/../config/app.config.json');
var defaultConfObj = conf.get('default');
var envConfObj = conf.get(nodeEnv);
var currentConfObj = Object.assign(defaultConfObj, envConfObj);
conf.put(nodeEnv, currentConfObj);
conf.getOld = conf.get;
conf.get = function (configName) {
    return conf.getOld(nodeEnv + '.' + configName);
};

module.exports = conf;