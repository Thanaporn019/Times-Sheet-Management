'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var db = {};
const dbConfig =  {
  "username": "postgres",
  "password": "11111",
  "database": "soc",
  "host": "10.20.208.21",
  "port": 5432,
  "dialect": "postgres",
  "timezone": "+07:00"
}
db.sqlLog = (msg) => {
  console.log(db.requestdata , msg);
};

var sequelize = undefined;
if ((process.env.DB_NAME) && (process.env.DB_USER) && (process.env.DB_PASSWORD) && (process.env.DB_HOST)) {

    let config = {
        dialect: (process.env.DB_DIALECT) ? process.env.DB_DIALECT : "postgres",
        host: process.env.DB_HOST,
        port: (process.env.DB_PORT) ? process.env.DB_PORT : 5432,
        database:  process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        timezone: "+07:00"
    };

    let dbName = process.env.DB_NAME;
    let dbUser = process.env.DB_USER;
    let dbPassword = process.env.DB_PASSWORD;
    sequelize = new Sequelize(dbName, dbUser, dbPassword, config);
} else {
  let _dbConfig = {...dbConfig};
  _dbConfig.pool = {
        max: 7,
        min: 2,
        idle: 20000,
        acquire: 40000,
        evict: 20000,
    }
    console.log(_dbConfig);
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, _dbConfig);
}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.requestdata = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
