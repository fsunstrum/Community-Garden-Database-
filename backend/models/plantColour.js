const { getConnection } = require('../config/db');

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
