const all = require('../models/all');

exports.getAllTableNames = async (req, res) => {    
    try {
        const tables = await all.getAllTableNames();
        if (tables) res.status(200).send(tables);
        else res.status(400).send({ message: "Unable to find any tables." })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllAttributesOfTable = async (req, res) => {
    const table_name = req.params.table_name;

    if (!table_name) return res.status(400).send({ message: "The table name is missing in your request." });

    try {
        const attrs = await all.getAllAttributesOfTable(table_name);
        if (attrs) return res.status(200).send(attrs);
        else return res.status(400).send({ message: "Unable to find the attributes for the table." });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}