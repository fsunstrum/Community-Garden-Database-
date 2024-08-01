const { getConnection } = require('../config/db');
const receives = require('./receives');

// Formats a date string to 'YYYY-MM-DD'
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Inserts donation into the database
async function insertDonation(data) {
    console.log("Received Data:", data);

    let connection;

    try {
        connection = await getConnection();

        // Check if garden_address exists in GardenInfo
        const gardenCheckSql = `SELECT COUNT(*) AS count FROM GardenInfo WHERE address = :garden_address`;
        const gardenCheckResult = await connection.execute(gardenCheckSql, [data.garden_address]);
        console.log("Garden Check Result:", gardenCheckResult);

        // Throw error if garden address does not exist
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

        // Insert into Receives table if successfully inserted into Donation table 
        if (donationResult.rowsAffected > 0) {

            // Insert into Receives table
            const receivesResult = await receives.insertReceives({ donation_id: data.donation_id, garden_address: data.garden_address }, connection);

            // Commit transaction if insert into Receives table was successful
            if (receivesResult.rowsAffected > 0) {
                await connection.commit(); 
                console.log("Transaction committed successfully");
                return true;
            } else {
                // Rollback the transaction if insert into Receives table fails
                await connection.rollback();
                console.log("Transaction rolled back due to receives insert failure");
                return false;
            }
        } else {
            // Rollback the transaction if insert into Donation table fails
            await connection.rollback();
            // console.log("Transaction rolled back due to donation insert failure");
            return false;
        }
    } catch (err) {
        console.error("Error executing query:", err.message);

        // Handle unique constraint error
        if (err.message.includes("ORA-00001")) {
            throw new Error('A donation with the same id already exists!');
        }

        if (connection) {
            try {
                await connection.rollback();
                // console.log("Transaction rolled back due to error");
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
    // Retrieve all donations with optional filters
    getAll: async (search = '', donorName = '', gardenAddress = '', date = '', dateCondition = '') => {
        let connection;
        try {
            connection = await getConnection();
            let sql = `
                SELECT d.donation_id, d.donor_name, TO_CHAR(d.don_date, 'YYYY-MM-DD') as don_date, d.item, r.garden_address, g.garden_name
                FROM Donation d
                LEFT JOIN Receives r ON d.donation_id = r.donation_id
                LEFT JOIN GardenInfo g ON r.garden_address = g.address
                WHERE 1=1
            `;
            // WHERE 1=1 equiv to WHERE TRUE; can easily concatenate conditions using AND operator 
            // https://pushmetrics.io/blog/why-use-where-1-1-in-sql-queries-exploring-the-surprising-benefits-of-a-seemingly-redundant-clause/#:~:text=What%20Does%20%22WHERE%201%3D1,not%20filter%20out%20any%20records.
            const params = [];

            // Apply donor name filter if provided
            if (donorName) {
                sql += ` AND d.donor_name LIKE :donorName`;
                params.push(`%${donorName}%`);
            }

            // Apply garden address filter if provided
            if (gardenAddress) {
                sql += ` AND r.garden_address LIKE :gardenAddress`;
                params.push(`%${gardenAddress}%`);
            }

            // Apply date filter if provided
            if (date) {
                const formattedDate = formatDate(date);
                // console.log("Formatted filterDate:", formattedDate); 
                if (dateCondition === 'before') {
                    sql += ` AND d.don_date < TO_DATE(:filterDate, 'YYYY-MM-DD')`;
                } else if (dateCondition === 'after') {
                    sql += ` AND d.don_date > TO_DATE(:filterDate, 'YYYY-MM-DD')`;
                } else {
                    sql += ` AND d.don_date = TO_DATE(:filterDate, 'YYYY-MM-DD')`;
                }
                params.push(formattedDate); // Use the formatted date in the query
            }

            const result = await connection.execute(sql, params);

            // Format the dates before returning
            const formattedRows = result.rows.map(row => {
                row[2] = formatDate(row[2]); // don_date is third element in row array
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
    }
};

module.exports = { insertDonation, donation };
