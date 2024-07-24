const connection = require('../config/db');

const Compost = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO Compost SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = Compost;
