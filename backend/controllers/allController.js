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
    const table_name = req.query.name;

    if (!table_name) return res.status(400).send({ message: "The table name is missing in your request." });

    try {
        const attrs = await all.getAllAttributesOfTable(table_name);
        if (attrs) return res.status(200).send(attrs);
        else return res.status(400).send({ message: "Unable to find the attributes for the table." });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

exports.getTable = async (req, res) => {
    const tname = req.params.table_name;
    const attrs = req.query.attrs;

    if (!tname || !attrs) return res.status(400).send({message: "Need to have table name and attrs specified!"});

    try {
        const table = await all.getTable(tname, attrs.split(","));
        if (table) return res.status(200).send(table);
        else return res.status(400).send({message: "Unable to find the specified table."});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}