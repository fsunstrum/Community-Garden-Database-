const { getConnection } = require('../config/db');

/**
 * Insert a new gardener plot into the GardenerPlot table.
 * @param {Object} data - The gardener plot data.
 * @param {String} data.garden_address - The address of the garden.
 * @param {String} data.gardener_email - The email of the gardener.
 * @param {Number} data.plot_num - The plot number.
 * @param {String} data.sun_exposure - The sun exposure of the plot.
 * @param {Number} data.plot_size - The size of the plot.
 * @param {Object} connection - The database connection.
 * @returns {Promise<Object>} The result of the insert operation.
 * @throws {Error} If there is an error during the insertion process.
 */
async function insertGardenerPlot(data, connection) {
    try {
        const sql = `INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size)
        VALUES (:garden_address, :gardener_email, :plot_num, :sun_exposure, :plot_size)`;

        const result = await connection.execute(sql,
            [data.garden_address, data.gardener_email, data.plot_num, data.sun_exposure, data.plot_size],
            { autoCommit: false }
        );

        return result;
    } catch (err) {
        throw err;
    }
}

/**
 * Get all gardener plots from the GardenerPlot table.
 * @returns {Promise<Object[]>} An array of all gardener plots.
 * @throws {Error} If there is an error during the retrieval process.
 */
async function getAll() {
    let connection;

    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT gp.garden_address, gp.gardener_email, gp.plot_num, gp.sun_exposure, gp.plot_size
            FROM GardenerPlot gp`
        );

        return result;
    } catch (err) {
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
 * Assign a gardener to a plot with random sun exposure and plot size.
 * @param {String} addr - The address of the garden.
 * @param {String} email - The email of the gardener.
 * @param {Number} pnum - The plot number.
 * @returns {Promise<Boolean>} True if the gardener was assigned to the plot successfully, otherwise false.
 * @throws {Error} If there is an error during the assignment process.
 */
async function assignGardenerToPlot(addr, email, pnum) {
    let connection;
    const sun_exposures = ["full sun", "part sun", "full shade", "part shade"]
    const randPlotSize = Math.floor(Math.random() * 10 + 5);
    const randIdx = Math.floor(Math.random() * 3)

    try {
        connection = await getConnection();
        const sql = `INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) 
        VALUES (:addr, :email, :pnum, :sun_exposure, :plot_size)`;
        const result = await connection.execute(sql, 
            [addr, email, pnum, sun_exposures[randIdx], randPlotSize], 
            {autoCommit: true});

        return result.rowsAffected && result.rowsAffected > 0;
    } catch (err) {
        console.error("Error executing query:", err.message);
        return false;
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
 * Unassign a gardener from a plot.
 * @param {String} addr - The address of the garden.
 * @param {Number} pnum - The plot number.
 * @returns {Promise<Boolean>} True if the gardener was unassigned from the plot successfully, otherwise false.
 * @throws {Error} If there is an error during the unassignment process.
 */
async function unassignGardenerFromPlot(addr, pnum) {
    let connection;

    try {
        connection = await getConnection();
        const sql = `DELETE FROM GardenerPlot WHERE garden_address = :addr AND plot_num = :pnum`;
        const result = await connection.execute(sql, [addr, pnum]);

        if (result.rowsAffected && result.rowsAffected == 1) {
            connection.commit();
            return true;
        } else {
            connection.rollback();
            return false;
        }
    } catch (err) {
        console.error("Error executing query:", err.message);
        if (err.message.includes("ORA-02292")) throw Error("The plot must have its plants removed before it can be unassigned from the owner.");
        connection.rollback();
        return false;
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
 * Delete gardener plots by their emails.
 * @param {String[]} emails - Array of email addresses.
 * @returns {Promise<Object>} The result of the delete operation.
 * @throws {Error} If there is an error during the deletion process.
 */
async function deleteGardenerPlotsByEmail(emails) {
    let connection;
    try {
        connection = await getConnection();
        const placeholders = emails.map((_, index) => `:email${index + 1}`).join(', ');
        const bindings = emails.reduce((acc, email, index) => {
            acc[`email${index + 1}`] = { val: email };
            return acc;
        }, {});

        const sql = `DELETE FROM GardenerPlot WHERE gardener_email IN (${placeholders})`;
        const result = await connection.execute(sql, bindings);

        return result;
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

module.exports = { insertGardenerPlot, getAll, assignGardenerToPlot, unassignGardenerFromPlot, deleteGardenerPlotsByEmail };
