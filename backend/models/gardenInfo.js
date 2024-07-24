const connection = require('../config/db');

const GardenInfo = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO GardenInfo SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = GardenInfo;
