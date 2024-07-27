const { getConnection } = require('../config/db');
const oracledb = require('oracledb');
// const { getAll,  insertGardener} = require('../controllers/gardenerController');

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

        const { placeholders, bindings } = constructBindings(emails.emails);
        const sql = `DELETE FROM Gardener WHERE email IN (${placeholders})`;

        const result = await connection.execute(sql, bindings, {autoCommit: true});
        console.log(result);
            

        
        return result;
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

// const Gardener = {
//     insert: (data, callback) => {
//         const sql = 'INSERT INTO Gardener SET ?';
//         connection.query(sql, data, callback);
//     }
// };

module.exports = {insertGardener, getAll, deleteGardenersByEmail};