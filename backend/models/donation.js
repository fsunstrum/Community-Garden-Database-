const { getConnection } = require('../config/db');

const Donation = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO Donation SET ?';
        connection.query(sql, data, callback);
    },
    // insert: async (data) => {
    //     let connection;
    //     try {
    //         connection = await getConnection();
    //         const result = await connection.execute(
    //             `INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (:donation_id, :donor_name, :don_date, :item)`,
    //             [data.donation_id, data.donor_name, data.don_date, data.item],
    //             { autoCommit: true }
    //         );
    //         return result;
    //     } catch (err) {
    //         console.error('Error executing query:', err.message);
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
    // },

    getAll: async () => {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT d.donation_id, d.donor_name, d.don_date, d.item, r.garden_address 
                 FROM Donation d 
                 JOIN Receives r ON d.donation_id = r.donation_id`
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

module.exports = Donation;
