const { getConnection } = require('../config/db');

/**
 * Retrieves all records from the HasCompost table.
 * @returns {Promise<Array>} The result of the query, including all columns from the HasCompost table.
 * @throws {Error} If there is an error during the query.
 */
async function getHasCompost() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT * FROM HasCompost`
        );
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

module.exports = { getHasCompost };
