const connection = require('../config/db');

const Donation = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO Donation SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = Donation;