const { getConnection } = require('../config/db');

/**
 * Inserts a new record into the Grows table.
 * @param {Object} data - The data to insert.
 * @param {string} data.species - The species of the plant.
 * @param {string} data.genus - The genus of the plant.
 * @param {string} data.variety - The variety of the plant.
 * @param {number} data.plot_num - The plot number.
 * @param {string} data.garden_address - The address of the garden.
 * @param {number} data.qty - The quantity of plants.
 * @param {string} data.plant_date - The planting date.
 * @param {Object} connection - The database connection.
 * @returns {Promise<Object>} The result of the insert operation.
 * @throws {Error} If there is an error during the insert operation.
 */
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

/**
 * Retrieves all records from the Grows table.
 * @returns {Promise<Object>} The result of the query.
 * @throws {Error} If there is an error during the query.
 */
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

/**
 * Retrieves gardens with total plants less than the average total for all gardens.
 * @returns {Promise<Array>} The result of the query, including garden address, name, number of plots, and total plants.
 * @throws {Error} If there is an error during the query.
 */
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
