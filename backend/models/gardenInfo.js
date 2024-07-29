const { getConnection } = require('../config/db');
const { getAll } = require('./receives');
// const { assignGardenerToPlot, unassignGardenerFromPlot } = require('./gardenerPlot');
// const { insertGardenNumPlots } = require('./gardenNumPlots');
const gnp = require('./gardenNumPlots');

async function insertGarden(data) {
    let connection;

    try {
        connection = await getConnection();
        // await connection.beginTransaction();

        // Insert into GardenInfo table
        const gardenInfoSql = `INSERT INTO GardenInfo (address, garden_name, num_of_plots) 
        VALUES (:address, :garden_name, :num_of_plots)`;
        const result = await connection.execute(gardenInfoSql,
            [data.address, data.garden_name, data.num_of_plots],
            {autoCommit: false});

        // if (gardenInfoResult.rowsAffected === 0) {
        //     throw new Error('Failed to insert into GardenInfo table');
        // }

        if (result.rowsAffected > 0) {
            // Insert into GardenNumPlots table
            const gnpResult = await gnp.insertGardenNumPlots({ address: data.address, num_of_plots: data.num_of_plots }, connection);

            if (gnpResult.rowsAffected > 0) {
                await connection.commit();
                console.log("Transaction committed successfully");
                return true;
            } else {
                await connection.rollback();
                console.log("Transaction rolled back due to gardenNumPlots insert failure");
                return false;
            }
        } else {
            await connection.rollback();
            console.log("Transaction rolled back due to gardenInfo insert failure");
            return false;
        }

        // // Insert into GardenNumPlots table
        // const gardenNumPlotsSql = `INSERT INTO GardenNumPlots (address, num_of_plots) 
        //                            VALUES (:address, :num_of_plots)`;
        // const gardenNumPlotsResult = await connection.execute(gardenNumPlotsSql, 
        //     [data.address, data.num_of_plots]);

        // if (gardenNumPlotsResult.rowsAffected === 0) {
        //     throw new Error('Failed to insert into GardenNumPlots table');
        // }

        // // Optionally insert into GardenerPlot table if gardener plot data is provided
        // if (data.gardener_email && data.plot_num && data.sun_exposure && data.plot_size) {
        //     const gardenerPlotData = {
        //         garden_address: data.address,
        //         gardener_email: data.gardener_email,
        //         plot_num: data.plot_num,
        //         sun_exposure: data.sun_exposure,
        //         plot_size: data.plot_size
        //     };
        //     const gardenerPlotResult = await insertGardenerPlot(gardenerPlotData, connection);
        //     if (gardenerPlotResult.rowsAffected === 0) {
        //         throw new Error('Failed to insert into GardenerPlot table');
        //     }
        // }

        // await connection.commit();
        // return true;

        // return result.rowsAffected && result.rowsAffected > 0;
    } catch (err) {
        console.error("Error executing query:", err.message);

        if (connection) {
            try {
                await connection.rollback();
                console.log("Transaction rolled back due to error");
            } catch (rollbackErr) {
                console.error('Error rolling back transaction:', rollbackErr.message);
            }
        }

        throw err;
        // console.error("Error executing query:", err.message);
        // return false;
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

// async function deleteGarden(address) {
//     let connection;

//     try {
//         connection = await getConnection();
//         // const sql = `DELETE FROM GardenInfo WHERE address = :address`;
//         const sql = `DELETE FROM GardenNumPlots WHERE address = :address`;
//         const result = await connection.execute(sql, [address], { autoCommit: true });

//         return result.rowsAffected > 0;
//     } catch (err) {
//         console.error("Error executing query:", err.message);
//         throw err;
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error('Error closing connection:', err.message);
//             }
//         }
//     }
// }

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
                gp.plot_num = gr.plot_num AND gr.garden_address = gi.address AND gp.gardener_email = g.email`
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

async function getGardenPlots(addr) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT g.name, gardener_email, plot_num, sun_exposure, plot_size
                FROM GardenerPlot gp, Gardener g
                WHERE garden_address = :addr AND gp.gardener_email = g.email`
            , [addr]);
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

async function getAllGardens(minPlots = 0) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT gi.address, gi.garden_name, gi.num_of_plots, gm.manager_email  
             FROM GardenInfo gi 
             LEFT JOIN GardenManages gm ON gi.garden_name = gm.garden_name
             WHERE gi.num_of_plots > :minPlots`, [minPlots]
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

async function getAllGardenAddresses() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT gi.address 
            FROM GardenInfo gi`
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

module.exports = { insertGarden, getGarden, getGardenPlotsPlanted, assignGardenerToPlot, getGardenPlots, unassignGardenerFromPlot, getAllGardens, getAllGardenAddresses };
