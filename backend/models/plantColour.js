const connection = require('../config/db');

const PlantColour = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO PlantColour SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = PlantColour;
