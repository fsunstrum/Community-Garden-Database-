const { getConnection } = require('../config/db');

// Returns the gardens wtih total plants less than the average total for all gardens
async function underAchievingGardens() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT garden_address, sumQty
                FROM (
                    SELECT garden_address, SUM(qty) AS sumQty 
                    FROM GROWS 
                    GROUP BY garden_address
                )
                WHERE sumQty < (
                    SELECT AVG(qtySum) 
                    FROM (
                        SELECT SUM(qty) as qtySum
                        FROM Grows 
                        GROUP BY garden_address ))`);
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

module.exports = { underAchievingGardens }
