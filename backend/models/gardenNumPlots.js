const { getConnection } = require('../config/db');

async function insertGardenNumPlots(data) {
    let connection;
    try {
        connection = await getConnection();
        const sql = 'INSERT INTO GardenNumPlots (address, num_of_plots) VALUES (:address, :num_of_plots)';
        const result = await connection.execute(sql, [data.address, data.num_of_plots], { autoCommit: true });

        return result.rowsAffected && result.rowsAffected > 0;
    } catch (err) {
        console.error("Error executing query:", err.message);
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

module.exports = { insertGardenNumPlots };
