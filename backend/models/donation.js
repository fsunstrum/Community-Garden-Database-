const { getConnection } = require('../config/db');

async function insertDonation(data) {
    let connection;

    try {
        connection = await getConnection();
        const sql = `INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (:donation_id, :donor_name, TO_DATE(:don_date , 'YYYY-MM-DD'), :item)`;
        const result = await connection.execute(sql,
            [data.donation_id, data.donor_name, data.don_date, data.item],
            { autoCommit: true }
        );

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

const donation = {
    getAll: async () => {
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `SELECT d.donation_id, d.donor_name, d.don_date, d.item, r.garden_address 
                 FROM Donation d 
                 LEFT JOIN Receives r ON d.donation_id = r.donation_id`
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

module.exports = {insertDonation, donation};

// const Donation = {
//     insert: (data, callback) => {
//         const sql = 'INSERT INTO Donation SET ?';
//         connection.query(sql, data, callback);
//     },


// };

// module.exports = Donation;
