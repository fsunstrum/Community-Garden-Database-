const connection = require('../config/db');

const PlantHarvest = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO PlantHarvest SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = PlantHarvest;
