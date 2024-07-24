const connection = require('../config/db');

const HasCompost = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO HasCompost SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = HasCompost;
