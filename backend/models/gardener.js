const { getConnection } = require('../config/db');
const oracledb = require('oracledb');
const gp = require('./gardenerPlot');

/**
 * Insert a new gardener into the Gardener table.
 * @param {Object} data - The gardener data.
 * @param {String} data.email - The gardener's email.
 * @param {String} data.phone - The gardener's phone number.
 * @param {String} data.name - The gardener's name.
 * @returns {Promise<Boolean>} True if the gardener was inserted successfully, otherwise false.
 * @throws {Error} If there is an error during the insertion process.
 */
async function insertGardener(data) {
    let connection;

    try {
        connection = await getConnection();
        const sql =
            'INSERT INTO Gardener (email, phone, name) VALUES (:email, :phone, :name)';
        const result = await connection.execute(sql,
            [data.email, data.phone, data.name],
            { autoCommit: true });

        // Return true if rows were affected
        return result.rowsAffected && result.rowsAffected > 0;
    } catch (err) {
        if (err.errorNum === 1) { // Unique constraint violation error code
            throw new Error('A gardener with the same name and phone number already exists.');
        } else {
            console.error("Error executing query:", err.message);
            throw err;
        }
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
 * Construct bindings for email addresses.
 * @param {String[]} emails - Array of email addresses.
 * @returns {Object} An object containing placeholders and bindings for the email addresses.
 */
function constructBindings(emails) {

    // Create placeholders for emails
    const placeholders = emails.map((_, index) => `:email${index + 1}`).join(', ');

    // Create bindings for emails
    const bindings = emails.reduce((acc, email, index) => {
        acc[`email${index + 1}`] = { val: email, type: oracledb.STRING };
        return acc;
    }, {});

    return { placeholders, bindings };
}

/**
 * Delete gardeners by their emails.
 * @param {Object} emails - Object containing an array of email addresses to delete.
 * @returns {Promise<Object|Boolean>} The result of the deletion or false if there was an error.
 * @throws {Error} If there is an error during the deletion process.
 */
async function deleteGardenersByEmail(emails) {
    let connection;

    try {
        connection = await getConnection();

        // Create a savepoint for transaction
        await connection.execute('SAVEPOINT deleteGardenersStart');

        // Construct bindings for emails
        const { placeholders, bindings } = constructBindings(emails.emails);

        // First, delete associated GardenerPlot entries
        await gp.deleteGardenerPlotsByEmail(emails.emails);

        const deleteGardenerSql = `DELETE FROM Gardener WHERE email IN (${placeholders})`;

        const result = await connection.execute(deleteGardenerSql, bindings);
        console.log(result);

        await connection.commit();
        return result;
    } catch (err) {
        console.error("Error executing query:", err.message);
        if (connection) {
            await connection.rollback();
        }
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
 * Get all gardeners.
 * @returns {Promise<Object[]>} An array of all gardeners.
 * @throws {Error} If there is an error during the retrieval process.
 */
async function getAll() {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            'SELECT g.name, g.email, g.phone FROM Gardener g ' //add associated plots/garden
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
 * Update gardener details.
 * @param {Object} data - The gardener data to update.
 * @param {String} data.email - The gardener's email.
 * @param {String} data.phone - The gardener's new phone number.
 * @param {String} data.name - The gardener's new name.
 * @returns {Promise<Boolean>} True if the gardener was updated successfully, otherwise false.
 * @throws {Error} If there is an error during the update process.
 */
async function updateGardener(data) {
    let connection;

    try {
        connection = await getConnection();
        const sql = `
            UPDATE Gardener
            SET phone = :phone, name = :name
            WHERE email = :email
        `;
        const result = await connection.execute(sql,
            [data.phone, data.name, data.email],
            { autoCommit: true });

        // Returns true if rows were affected
        return result.rowsAffected && result.rowsAffected > 0;
    } catch (err) {
        if (err.message.includes("ORA-00001")) {
            throw new Error('A gardener with the same name and phone number already exists.');
        } else {
            console.error("Error executing query:", err.message);
            throw err;
        }

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

module.exports = { insertGardener, getAll, deleteGardenersByEmail, updateGardener };