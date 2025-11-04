require('dotenv').config(); // pastikan kamu sudah install dotenv

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'my_database',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME_TEST || 'test_db',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
    },
};
