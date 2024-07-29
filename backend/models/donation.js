const { getConnection } = require('../config/db');
const receives = require('./receives');

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


async function insertDonation(data) {
    console.log("Received Data:", data);

    let connection;

    try {
        connection = await getConnection();

        // Check if garden_address exists in GardenInfo
        const gardenCheckSql = `SELECT COUNT(*) AS count FROM GardenInfo WHERE address = :garden_address`;
        const gardenCheckResult = await connection.execute(gardenCheckSql, [data.garden_address]);
        console.log("Garden Check Result:", gardenCheckResult);

        if (gardenCheckResult.rows[0][0] === 0) {
            throw new Error('Garden address does not exist in GardenInfo');
        }

        // Insert into Donation table
        const donationSql = `INSERT INTO Donation (donation_id, donor_name, don_date, item) 
        VALUES (:donation_id, :donor_name, TO_DATE(:don_date , 'YYYY-MM-DD'), :item)`;
        const donationResult = await connection.execute(donationSql,
            [data.donation_id, data.donor_name, data.don_date, data.item],
            { autoCommit: false }
        );
        console.log("Donation Insert Result:", donationResult);

        if (donationResult.rowsAffected > 0) {
            console.log("Before inserting into Receives:", data);

            // Insert into Receives table
            const receivesResult = await receives.insertReceives({ donation_id: data.donation_id, garden_address: data.garden_address }, connection);
            console.log("Receives Insert Result:", receivesResult);

            if (receivesResult.rowsAffected > 0) {
                await connection.commit(); 
                console.log("Transaction committed successfully");
                return true;
            } else {
                await connection.rollback();
                console.log("Transaction rolled back due to receives insert failure");
                return false;
            }
        } else {
            await connection.rollback();
            console.log("Transaction rolled back due to donation insert failure");
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

const donation = {
    getAll: async (search = '') => {
        let connection;
        try {
            connection = await getConnection();
            let sql = `
                SELECT d.donation_id, d.donor_name, TO_CHAR(d.don_date, 'YYYY-MM-DD') as don_date, d.item, r.garden_address, g.garden_name
                FROM Donation d
                LEFT JOIN Receives r ON d.donation_id = r.donation_id
                LEFT JOIN GardenInfo g ON r.garden_address = g.address
            `;
            const params = [];
            if (search) {
                sql += ` WHERE d.donor_name LIKE :search OR r.garden_address LIKE :search`;
                params.push(`%${search}%`, `%${search}%`);
            }
            const result = await connection.execute(sql, params);

            // Format the dates before returning
            const formattedRows = result.rows.map(row => {
                row[2] = formatDate(row[2]); // don_date is the third element in the row array
                return row;
            });

            return formattedRows;
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
    },
    getAttributes: async () => {
        let connection;
        try {
            connection = await getConnection();
            const sql = `SELECT column_name FROM user_tab_columns WHERE table_name = 'DONATION'`;
            const result = await connection.execute(sql);
            return result.rows.map(row => row[0]);
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
    },
    getData: async (attributes, search) => {
        let connection;
        try {
            connection = await getConnection();
            const attributesArray = attributes.split(',');
            let sql = `SELECT ${attributesArray.join(', ')} FROM Donation d`;
            const params = [];

            if (search) {
                sql += ` WHERE d.donor_name LIKE :search OR d.garden_address LIKE :search`;
                params.push(`%${search}%`);
            }

            const result = await connection.execute(sql, params);
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

module.exports = { insertDonation, donation };
