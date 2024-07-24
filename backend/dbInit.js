const fs = require('fs');
const path = require('path');
const { initializeConnectionPool, getConnection } = require('./config/db');

// Path to the SQL file
const sqlFilePath = path.join(__dirname, 'sql', 'initializeTables.sql');

async function initializeDatabase() {
    // Initialize the connection pool
    await initializeConnectionPool();

    // Read the SQL file
    fs.readFile(sqlFilePath, 'utf8', async (err, sql) => {
        if (err) {
            console.error('Error reading the SQL file:', err.message);
            return;
        }

        // Get a connection from the pool
        let connection;
        try {
            connection = await getConnection();
            // Split and execute the SQL script
            const sqlStatements = sql.split(';').map(query => query.trim()).filter(query => query);
            for (const statement of sqlStatements) {
                await connection.execute(statement, [], { autoCommit: true });
            }
            console.log('Database initialized successfully.');
        } catch (err) {
            console.error('Error executing the SQL script:', err.message);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error('Error closing connection:', err.message);
                }
            }
        }
    });
}

initializeDatabase();
