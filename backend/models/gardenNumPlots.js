const connection = require('../config/db');

const GardenNumPlots = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO GardenNumPlots SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = GardenNumPlots;
