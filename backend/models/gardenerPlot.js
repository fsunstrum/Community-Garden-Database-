const { getConnection } = require('../config/db');

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

module.exports = { insertGardenerPlot, getAll, assignGardenerToPlot, unassignGardenerFromPlot };
