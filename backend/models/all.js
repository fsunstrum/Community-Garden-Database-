const { getConnection } = require('../config/db');
const oracledb = require('oracledb');

async function getAllTableNames() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(`SELECT TABLE_NAME FROM USER_TABLES`);
        return result.rows.map((row) => row[0].toLowerCase());
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
    tname = tname.toLowerCase();
    const validTables = await getAllTableNames();

    if (!validTables.includes(tname)) throw Error("Invalid table name.")

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

async function constructSelectQuery(tname, attrs) {
    const validAttrs = await getAllAttributesOfTable(tname);

    for (var i = 0; i < attrs.length; i++) {
        if (!validAttrs.includes(attrs[i])) return `SELECT * FROM ${tname}`;
    }

    return `SELECT ${attrs.join(', ')} FROM ${tname}`;
}

async function getTable(tname, attrs) {
    console.log(attrs);
    tname = tname.toLowerCase();
    const validTables = await getAllTableNames();

    if (!validTables.includes(tname)) throw Error("Invalid table name.");
    const query = await constructSelectQuery(tname, attrs);

    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(query);
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

module.exports = { getAllTableNames, getAllAttributesOfTable, getTable }