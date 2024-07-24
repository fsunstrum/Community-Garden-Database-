const oracledb = require('oracledb');
require('dotenv').config();

const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASS,
    connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 10,
    poolIncrement: 1
};

async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Error initializing connection pool:', err.message);
    }
}

async function closePoolAndExit() {
    console.log('Terminating');
    try {
        await oracledb.getPool().close(10);
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing pool:', err.message);
        process.exit(1);
    }
}

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);

async function getConnection() {
    let connection;
    try {
        connection = await oracledb.getConnection();
        console.log('Successfully connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
    return connection;
}

module.exports = {
    initializeConnectionPool,
    getConnection
};
