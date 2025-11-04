const { Sequelize } = require('sequelize');
const appConfigs = require('./appConfigs');

const sequelize = new Sequelize(appConfigs.db.name, appConfigs.db.user, appConfigs.db.password, {
    host: appConfigs.db.host,
    dialect: appConfigs.db.dialect,
    logging: false,
    port: appConfigs.db.port,
});

module.exports = sequelize;
