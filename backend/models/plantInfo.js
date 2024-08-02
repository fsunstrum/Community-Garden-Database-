const { getConnection } = require('../config/db');
const plantColour = require('./plantColour');
const plantHarvest = require('./plantHarvest');

/**
 * Inserts plant information into the database.
 * @param {Object} data - The data to insert.
 * @param {string} data.common_name - The common name of the plant.
 * @param {string} [data.colour] - The colour of the plant.
 * @param {string} [data.harvest_time] - The harvest time of the plant.
 * @param {string} data.species - The species of the plant.
 * @param {string} data.genus - The genus of the plant.
 * @param {string} data.variety - The variety of the plant.
 * @returns {Promise<boolean>} True if the insertion was successful, otherwise false.
 * @throws {Error} If there is an error during the query execution.
 */
async function insertPlantInfo(data) {
    let connection;

    try {
        connection = await getConnection();

        // Insert into PlantColour table
        if (data.colour) {
            const colourResult = await plantColour.insertPlantColour({ common_name: data.common_name, colour: data.colour }, connection);
            console.log("PlantColour Insert Result:", colourResult);
        }

        // Insert into PlantHarvest table
        if (data.harvest_time) {
            const harvestResult = await plantHarvest.insertPlantHarvest({ common_name: data.common_name, harvest_time: data.harvest_time }, connection);
            console.log("PlantHarvest Insert Result:", harvestResult);
        }

        // Insert into PlantInfo table
        const plantInfoSql = `INSERT INTO PlantInfo (species, genus, variety, common_name)
        VALUES (:species, :genus, :variety, :common_name)`;
        const plantInfoResult = await connection.execute(plantInfoSql,
            [data.species, data.genus, data.variety, data.common_name],
            { autoCommit: false }
        );
        console.log("PlantInfo Insert Result:", plantInfoResult);

        if (plantInfoResult.rowsAffected > 0) {
            await connection.commit();
            console.log("Transaction committed successfully");
            return true;
        } else {
            await connection.rollback();
            console.log("Transaction rolled back due to PlantInfo insert failure");
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

const plantInfo = {
    /**
     * Retrieves all plant information from the database.
     * @returns {Promise<Array>} An array of rows containing plant information.
     * @throws {Error} If there is an error during the query execution.
     */
    getAll: async () => {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT pi.species, pi.genus, pi.variety, pi.common_name, pc.colour, ph.harvest_time
                 FROM PlantInfo pi
                 LEFT JOIN PlantColour pc ON pi.common_name = pc.common_name
                 LEFT JOIN PlantHarvest ph ON pi.common_name = ph.common_name`
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

module.exports = { insertPlantInfo, plantInfo };
