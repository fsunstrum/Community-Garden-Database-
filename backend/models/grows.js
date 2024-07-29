const { getConnection } = require('../config/db');

async function insertGrows(data, connection) {
    try {
        const sql = `INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date)
        VALUES (:species, :genus, :variety, :plot_num, :garden_address, :qty, :plant_date)`;

        const result = await connection.execute(sql,
            [data.species, data.genus, data.variety, data.plot_num, data.garden_address, data.qty, data.plant_date],
            { autoCommit: false }
        );

        return result;
    } catch (err) {
        throw err;
    }
}

async function getAll() {
    let connection;

    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT g.species, g.genus, g.variety, g.plot_num, g.garden_address, g.qty, g.plant_date
            FROM Grows g`
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

// Returns the gardens with total plants less than the average total for all gardens
async function underAchievingGardens() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT garden_address, gi.garden_name, gi.num_of_plots, sumQty as total_plants
                FROM (
                    SELECT garden_address, SUM(qty) AS sumQty 
                    FROM GROWS 
                    GROUP BY garden_address
                ) gr
                LEFT JOIN GardenInfo gi ON gi.address = gr.garden_address
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

module.exports = { insertGrows, getAll, underAchievingGardens }
