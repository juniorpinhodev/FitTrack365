const { Sequelize } = require('sequelize');
const config = require('../config/database.config');

const connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
});

module.exports = connection;
