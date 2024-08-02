const { getConnection } = require('../config/db');

/**
 * Retrieve all garden managers.
 * @returns {Promise<Object[]>} An array of garden managers.
 * @throws {Error} If there is an error during the retrieval process.
 */
async function getManagers() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT * FROM GardenManager`
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

module.exports = {getManagers};