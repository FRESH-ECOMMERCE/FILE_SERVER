const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const FileStorage = sequelize.define('file_storage', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = FileStorage;
