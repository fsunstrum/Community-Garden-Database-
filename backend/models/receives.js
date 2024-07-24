const { getConnection } = require('../config/db');

const Receives = {
    insert: async (data) => {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `INSERT INTO Receives (donation_id, garden_address) VALUES (:donation_id, :garden_address)`,
                [data.donation_id, data.garden_address],
                { autoCommit: true }
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
};

module.exports = Receives;
