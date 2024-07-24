const connection = require('../config/db');

const Tool = {
    insert: (data, callback) => {
        const sql = 'INSERT INTO Tool SET ?';
        connection.query(sql, data, callback);
    }
};

module.exports = Tool;
