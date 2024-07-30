const { getConnection } = require('../config/db');

async function getAllTableNames() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(`SELECT TABLE_NAME FROM USER_TABLES`);
        return result.rows;
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err.message);
            }
        }
    }
}

async function getAllAttributesOfTable(tname) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(`SELECT * FROM ${tname}`);
        const attrs = result.metaData.map((md) => md.name);
        return attrs;
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err.message);
            }
        }
    }
}

module.exports = { getAllTableNames, getAllAttributesOfTable }