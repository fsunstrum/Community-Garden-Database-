const connection = require('../config/db');

const GardenManages = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO GardenManages SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = GardenManages;
