const { getConnection } = require('../config/db');

/**
 * Inserts a record into the Receives table.
 * @param {Object} data - The data to insert.
 * @param {string} data.donation_id - The ID of the donation.
 * @param {string} data.garden_address - The address of the garden.
 * @param {Object} connection - The database connection.
 * @returns {Promise<Object>} The result of the insertion.
 * @throws {Error} If there is an error during the query execution.
 */
async function insertReceives(data, connection) {
    try {
        const sql = `INSERT INTO Receives (donation_id, garden_address)
        VALUES (:donation_id, :garden_address)`;

        const result = await connection.execute(sql,
            [data.donation_id, data.garden_address],
            { autoCommit: false }
        );

        console.log("Receives Insert Result:", result);
        return result;
    } catch (err) {
        console.error("Error executing query:", err.message);
        throw err;
    }
}

/**
 * Retrieves all records from the Receives table.
 * @returns {Promise<Array>} An array of rows containing the records.
 * @throws {Error} If there is an error during the query execution.
 */
async function getAll() {
    let connection;

    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT r.donation_id, r.garden_address
                FROM Receives r`
        );

        return result;
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

module.exports = { insertReceives, getAll };