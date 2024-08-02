const { getConnection } = require('../config/db');
const oracledb = require('oracledb');

/**
 * Retrieves all table names in the user's schema.
 * @returns {Promise<String[]>} An array of table names in lowercase.
 * @throws {Error} If there's an error executing the query or closing the connection.
 */
async function getAllTableNames() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(`SELECT TABLE_NAME FROM USER_TABLES`);

        // Return table names in lowercase
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

/**
 * Retrieves all attribute names of a specified table.
 * @param {String} tname - The name of the table.
 * @returns {Promise<String[]>} An array of attribute names.
 * @throws {Error} If the table name is invalid, or if there's an error executing the query or closing the connection.
 */
async function getAllAttributesOfTable(tname) {
    // Convert table name to lowercase
    tname = tname.toLowerCase();

    // Getting all valid table names
    const validTables = await getAllTableNames();

    if (!validTables.includes(tname)) throw Error("Invalid table name.")

    let connection;
    try {
        connection = await getConnection();
        // Get all attributes from given table
        const result = await connection.execute(`SELECT * FROM ${tname}`);

        // Extract attribute names from metadata
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

/**
 * Constructs a SELECT query based on table name and attributes.
 * @param {String} tname - The name of the table.
 * @param {String[]} attrs - An array of attribute names to select.
 * @returns {Promise<String>} A SELECT query string.
 * @throws {Error} If any attribute is invalid.
 */
async function constructSelectQuery(tname, attrs) {
    // Get all valid attributes of a table
    const validAttrs = await getAllAttributesOfTable(tname);

    // Check if provided attributes are valid
    for (var i = 0; i < attrs.length; i++) {
        // If any attribute is invalid, return query selecting all columns
        if (!validAttrs.includes(attrs[i])) return `SELECT * FROM ${tname}`;
    }

    // Construct and return the SELECT query
    return `SELECT ${attrs.join(', ')} FROM ${tname}`;
}

/**
 * Retrieves data from the specified table with optional attributes selection.
 * @param {String} tname - The name of the table.
 * @param {String[]} attrs - An array of attribute names to select.
 * @returns {Promise<Object[]>} An array of rows with the selected data.
 * @throws {Error} If the table name is invalid, or if there's an error executing the query or closing the connection.
 */
async function getTable(tname, attrs) {
    console.log(attrs);

    // Convert table name to lowercase
    tname = tname.toLowerCase();

    // Get all valid table names
    const validTables = await getAllTableNames();

    if (!validTables.includes(tname)) throw Error("Invalid table name.");
    const query = await constructSelectQuery(tname, attrs);

    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(query);

        // Return query results
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