const GardenInfo = require('../models/gardenInfo');
const GardenManages = require('../models/gardenManages');

exports.createGarden = async (req, res) => {
    const { garden_name, manager_email, address, num_of_plots } = req.body;

    if (!garden_name || !manager_email || !address || !num_of_plots) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        await GardenInfo.insert({ donation_id, donor_name, date, item });
        await GardenManages.insert({ donation_id, garden_address });
        res.status(201).send({ message: 'Donation created successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllGardens = async (req, res) => {
    try {
        const gardens = await GardenInfo.getAll();
        res.status(200).send(gardens);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
