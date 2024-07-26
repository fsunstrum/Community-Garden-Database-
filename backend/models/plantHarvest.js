const { getConnection } = require('../config/db');

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
