const gm = require('../models/gardenManager');

exports.getAllManagers = async (req, res) => {
    try {
        const managers = await gm.getManagers();
        res.status(200).send(managers);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
