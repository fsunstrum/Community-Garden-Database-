const connection = require('../config/db');

const GardenManager = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO GardenManager SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = GardenManager;
