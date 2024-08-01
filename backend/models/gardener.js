const { getConnection } = require('../config/db');
const oracledb = require('oracledb');
// const { getAll,  insertGardener} = require('../controllers/gardenerController');
const gp = require('./gardenerPlot');

async function insertGardener(data) {
    let connection;

    try {
        connection = await getConnection();
        const sql = 
        'INSERT INTO Gardener (email, phone, name) VALUES (:email, :phone, :name)';
        const result = await connection.execute(sql,
            [data.email, data.phone, data.name],
            {autoCommit: true});

        return result.rowsAffected && result.rowsAffected > 0;
    } catch (err) {
        if (err.errorNum === 1) { // Unique constraint violation error code
            throw new Error('A gardener with the same name and phone number already exists.');
        } else {
            console.error("Error executing query:", err.message);
            throw err;
        }
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


function constructBindings(emails) {

    const placeholders = emails.map((_, index) => `:email${index + 1}`).join(', ');

    const bindings = emails.reduce((acc, email, index) => {
        acc[`email${index + 1}`] = { val: email, type: oracledb.STRING };
        return acc;
    }, {});

    return { placeholders, bindings };
}

async function deleteGardenersByEmail(emails) {
    let connection;

    try {
        connection = await getConnection();
        await connection.execute('SAVEPOINT deleteGardenersStart');
        
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

async function  getAll() {
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

        return result.rowsAffected && result.rowsAffected > 0;
    } catch (err) {
        if (err.message.includes("ORA-00001")) { 
            throw new Error('A gardener with the same name and phone number already exists.');
        } else {
            console.error("Error executing query:", err.message);
            throw err;
        }
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

module.exports = { insertGardener, getAll, deleteGardenersByEmail, updateGardener };