const connection = require('../config/db');

const PlantInfo = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO PlantInfo SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = PlantInfo;
