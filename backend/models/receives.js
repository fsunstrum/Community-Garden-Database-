const { getConnection } = require('../config/db');

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