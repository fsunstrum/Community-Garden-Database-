const { getConnection } = require('../config/db');

/**
 * Insert a new record into the GardenNumPlots table.
 * @param {Object} data - The data to insert.
 * @param {string} data.address - The address of the garden.
 * @param {number} data.num_of_plots - The number of plots in the garden.
 * @param {Object} connection - The database connection.
 * @returns {Promise<Object>} The result of the insert operation.
 * @throws {Error} If there is an error during the insert operation.
 */
async function insertGardenNumPlots(data, connection) {
    try {
        const sql = 'INSERT INTO GardenNumPlots (address, num_of_plots) VALUES (:address, :num_of_plots)';
        const result = await connection.execute(sql, 
            [data.address, data.num_of_plots], 
            { autoCommit: false }
        );

        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { insertGardenNumPlots };
