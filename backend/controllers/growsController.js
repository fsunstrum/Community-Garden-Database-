const grows = require('../models/grows');

exports.getUnderachievingGardens = async (req, res) => {
    try {
        const gardens = await grows.getUnderachievingGardens();
        res.status(200).send(gardens);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
