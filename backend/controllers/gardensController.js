const gi = require('../models/gardenInfo');
const GardenManages = require('../models/gardenManages');

exports.createGarden = async (req, res) => {
    const { address, garden_name, num_of_plots, manager_email } = req.body;

    if (!garden_name || !manager_email || !address || !num_of_plots) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        const result = await gi.insertGarden({ address, garden_name, num_of_plots, manager_email });

        if (result) res.status(201).send({ message: 'Garden added successfully!' });
        else res.status(400).send({ message: 'A garden with the same address already exists!' });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
};

exports.getAllGardens = async (req, res) => {
    try {
        const gardens = await gi.gi.getAll();
        res.status(200).send(gardens);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
