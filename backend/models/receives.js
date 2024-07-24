const connection = require('../config/db');

const Receives = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO Receives SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = Receives;
