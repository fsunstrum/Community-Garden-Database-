const connection = require('../config/db');

const Gardener = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO Gardener SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = Gardener;
