const sequelize = require('../configs/database');
const FileStorage = require('./fileStorage');

const db = {
    sequelize,
    FileStorage,
};

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');
        await sequelize.sync({ alter: true });
        console.log('✅ All models synchronized.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}

connectDB();

module.exports = db;
