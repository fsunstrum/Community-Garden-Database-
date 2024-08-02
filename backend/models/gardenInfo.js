const { getConnection } = require('../config/db');
const { getAll } = require('./receives');
const gnp = require('./gardenNumPlots');

/**
 * Insert a new garden into GardenInfo and GardenNumPlots tables.
 * @param {Object} data - The garden data.
 * @param {String} data.address - The address of the garden.
 * @param {String} data.garden_name - The name of the garden.
 * @param {Number} data.num_of_plots - The number of plots in the garden.
 * @returns {Promise<Boolean>} True if the garden was inserted successfully, otherwise false.
 * @throws {Error} If there is an error during the insertion process.
 */
async function insertGarden(data) {
    let connection;

    try {
        connection = await getConnection();

        // Insert into GardenInfo table
        const gardenInfoSql = `INSERT INTO GardenInfo (address, garden_name, num_of_plots) 
        VALUES (:address, :garden_name, :num_of_plots)`;
        const result = await connection.execute(gardenInfoSql,
            [data.address, data.garden_name, data.num_of_plots],
            { autoCommit: false });

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
 * Get details of a specific garden by its name.
 * @param {String} name - The name of the garden.
 * @returns {Promise<Object[]>} An array of garden details.
 * @throws {Error} If there is an error during the retrieval process.
 */
async function getGarden(name) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT gi.address, gi.garden_name, gi.num_of_plots, gm.manager_email, hc.bin_id, c.capacity  
                FROM GardenInfo gi 
                LEFT JOIN GardenManages gm ON gi.garden_name = gm.garden_name
                LEFT JOIN HasCompost hc ON gi.address = hc.garden_address
                LEFT JOIN Compost c ON hc.bin_id = c.bin_id
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

/**
 * Get all plots that are planted in a specific garden by garden name.
 * @param {String} name - The name of the garden.
 * @returns {Promise<Object[]>} An array of planted plots details.
 * @throws {Error} If there is an error during the retrieval process.
 */
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

/**
 * Get all plots in a specific garden by garden address.
 * @param {String} addr - The address of the garden.
 * @returns {Promise<Object[]>} An array of plot details.
 * @throws {Error} If there is an error during the retrieval process.
 */
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

/**
 * Get all tools for a specific garden by garden address.
 * @param {String} addr - The address of the garden.
 * @returns {Promise<Object[]>} An array of tool details.
 * @throws {Error} If there is an error during the retrieval process.
 */
async function getAllToolsForGarden(addr) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT t.tool_type, s.availability, s.garden_address
             FROM Tool t
             JOIN Stores s ON t.tool_type = s.tool_type
             WHERE s.garden_address = :addr`, [addr]);
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

/**
 * Update the availability of a tool in a specific garden.
 * @param {String} toolType - The type of the tool.
 * @param {Number} availability - The availability status of the tool.
 * @param {String} gardenAddress - The address of the garden.
 * @returns {Promise<Object>} The result of the update operation.
 * @throws {Error} If there is an error during the update process.
 */
async function updateToolAvailability(toolType, availability, gardenAddress) {
    let connection;
    try {
        connection = await getConnection();
        const sql = `UPDATE Stores SET availability = :availability WHERE tool_type = :toolType AND garden_address = :gardenAddress`;
        const result = await connection.execute(sql, [availability, toolType, gardenAddress], { autoCommit: true });

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
            { autoCommit: true });

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
 * Get all gardens with optional minimum number of plots and minimum available plots.
 * @param {Number} [minPlots=0] - The minimum number of plots in the garden.
 * @param {Number} [minAvailPlots=0] - The minimum number of available plots in the garden.
 * @returns {Promise<Object[]>} An array of garden details.
 * @throws {Error} If there is an error during the retrieval process.
 */
async function getAllGardens(minPlots = 0, minAvailPlots = 0) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `SELECT 
                gi.address, gi.garden_name, gi.num_of_plots, gm.manager_email  
             FROM 
                GardenInfo gi 
             LEFT JOIN 
                GardenManages gm ON gi.garden_name = gm.garden_name
             LEFT JOIN
                GardenerPlot gp ON gi.address = gp.garden_address
             WHERE 
                gi.num_of_plots >= :minPlots
             GROUP BY
                gi.address, gi.garden_name, gi.num_of_plots, gm.manager_email             
             HAVING
                (gi.num_of_plots - COUNT(gp.plot_num)) >= :minAvailPlots
        
             `, [minPlots, minAvailPlots]
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

/**
 * Get all garden addresses.
 * @returns {Promise<Object[]>} An array of garden addresses.
 * @throws {Error} If there is an error during the retrieval process.
 */
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

module.exports = {
    insertGarden,
    getGarden,
    getGardenPlotsPlanted,
    assignGardenerToPlot,
    getGardenPlots,
    unassignGardenerFromPlot,
    getAllGardens,
    getAllGardenAddresses,
    getAllToolsForGarden,
    updateToolAvailability
};
