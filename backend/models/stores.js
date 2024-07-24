const connection = require('../config/db');

const Stores = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO Stores SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = Stores;
