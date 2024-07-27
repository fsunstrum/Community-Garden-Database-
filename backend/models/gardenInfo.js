const { getConnection } = require('../config/db');

async function insertGarden(data) {
    let connection;

    try {
        connection = await getConnection();
        const sql = `INSERT INTO GardenInfo (address, garden_name, num_of_plots) 
    VALUES (:address, :garden_name, :num_of_plots)`;
        const result = await connection.execute(sql, 
            [data.address, data.garden_name, data.num_of_plots], 
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

async function getGarden(name) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT gi.address, gi.garden_name, gi.num_of_plots, gm.manager_email  
                FROM GardenInfo gi 
                LEFT JOIN GardenManages gm ON gi.garden_name = gm.garden_name
                WHERE gi.garden_name = :name`
        , [name]);
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

async function getGardenPlotsPlanted(name) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT gp.plot_num, g.name, gp.sun_exposure, gp.plot_size, gr.species, gr.genus, gr.variety, gr.qty, gr.plant_date
                FROM GardenInfo gi, GardenerPlot gp, Grows gr, Gardener g
                WHERE gi.garden_name = :name AND gp.garden_address = gi.address AND 
                gp.plot_num = gr.plot_num AND gp.gardener_email = g.email`
        , [name]);
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

async function assignGardenerToPlot(data) {
    let connection;
    const sun_exposures = ["full sun", "part sun", "full shade", "part shade"]
    const randPlotSize = Math.floor(Math.random() * 10 + 5);
    const randIdx = Math.floor(Math.random() * 3)

    try {
        connection = await getConnection();
        const sql = `INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) 
    VALUES (:address, :email, :plot_num, :sun, :size)`;
        const result = await connection.execute(sql, 
            [data.addr, data.email, data.pnum, sun_exposures[randIdx], randPlotSize], 
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

const gi = {
    getAll: async () => {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT gi.address, gi.garden_name, gi.num_of_plots, gm.manager_email  
                 FROM GardenInfo gi 
                 LEFT JOIN GardenManages gm ON gi.garden_name = gm.garden_name`
            );
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
};

module.exports = {insertGarden, getGarden, getGardenPlotsPlanted, assignGardenerToPlot, gi};
