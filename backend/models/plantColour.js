const { getConnection } = require('../config/db');

/**
 * Inserts a new record into the PlantColour table.
 * @param {Object} data - The data to insert.
 * @param {string} data.common_name - The common name of the plant.
 * @param {string} data.colour - The colour of the plant.
 * @param {Object} connection - The database connection.
 * @returns {Promise<Object>} The result of the insert operation.
 * @throws {Error} If there is an error during the query execution.
 */
async function insertPlantColour(data, connection) {
    try {
        const sql = `INSERT INTO PlantColour (common_name, colour)
        VALUES (:common_name, :colour)`;

        const result = await connection.execute(sql,
            [data.common_name, data.colour],
            { autoCommit: false}
        );

        return result;
    } catch (err) {
        console.error("Error executing query:", err.message);
        throw err;
    }
}

module.exports = {insertPlantColour};
