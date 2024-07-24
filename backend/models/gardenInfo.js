const { getConnection } = require('../config/db');

const GardenInfo = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO GardenInfo SET ?';
        connection.query(sql, data, callback);
    },

    getAll: async () => {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT gi.address, gi.garden_name, gi.num_of_plots, gm.manager_email  
                 FROM GardenInfo gi 
                 JOIN GardenManages gm ON gi.garden_name = gm.garden_name`
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

module.exports = GardenInfo;
