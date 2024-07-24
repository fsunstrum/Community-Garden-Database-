const connection = require('../config/db');

const GardenerPlot = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO GardenerPlot SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = GardenerPlot;
