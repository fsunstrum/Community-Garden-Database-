const { getConnection } = require('../config/db');

/**
 * Inserts a new record into the PlantHarvest table.
 * @param {Object} data - The data to insert.
 * @param {string} data.common_name - The common name of the plant.
 * @param {string} data.harvest_time - The harvest time of the plant.
 * @param {Object} connection - The database connection.
 * @returns {Promise<Object>} The result of the insert operation.
 * @throws {Error} If there is an error during the query execution.
 */
async function insertPlantHarvest(data, connection) {
    try {
        const sql = `INSERT INTO PlantHarvest (common_name, harvest_time)
        VALUES (:common_name, :harvest_time)`;

        const result = await connection.execute(sql,
            [data.common_name, data.harvest_time],
            { autoCommit: false }
        );

        console.log("Receives Insert Result:", result);
        return result;
    } catch (err) {
        console.error("Error executing query:", err.message);
        throw err;
    }
}

module.exports = (insertPlantHarvest);
