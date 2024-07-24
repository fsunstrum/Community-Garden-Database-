const connection = require('../config/db');

const Grows = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO Grows SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = Grows;
