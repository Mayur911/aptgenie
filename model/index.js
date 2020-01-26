var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require("../config/config.js");
var config_sequelize = {
    database: config.mysql.database,
    username: config.mysql.username,
    password: config.mysql.password,
    host: config.mysql.hostname,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
}

var sequelize = new Sequelize(config_sequelize.database, config.mysql.username, config.mysql.password, {
  dialect: 'mysql',
  host: '/cloudsql/aptgenie-266222:us-central1:aptgenie',
  timestamps: false,
  dialectOptions: {
    socketPath: '/cloudsql/aptgenie-266222:us-central1:aptgenie'
}});
var db = {};

fs
        .readdirSync(__dirname)
        .filter(function (file) {
          return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
          var model = sequelize["import"](path.join(__dirname, file));
          db[model.name] = model;
        });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;