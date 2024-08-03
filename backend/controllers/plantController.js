const plantInfo = require('../models/plantInfo');
const grows = require('../models/grows');

exports.createPlant = async (req, res) => {
    const { species, genus, variety, common_name, colour, harvest_time } = req.body;

    if (!species || !genus || !variety || !common_name) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        console.log("Inserting Plant:", { species, genus, variety, common_name, colour, harvest_time });
        const result = await plantInfo.insertPlantInfo({ species, genus, variety, common_name, colour, harvest_time });

        if (result) {
            res.status(201).send({ message: 'Plant added successfully!' });
        } else {
            res.status(400).send({ message: 'A plant with the same speices, genus, and variety already exists!' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getPopularPlants = async (req, res) => {
    console.log('getPopularPlants called');
    try {
        const popPlants = await plantInfo.getPopularPlants();
        res.status(200).send(popPlants);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAllPlants = async (req, res) => {
    try {
        const plants = await plantInfo.plantInfo.getAll();
        res.status(200).send(plants);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};



exports.getAllGrows = async (req, res) => {
    try {
        const growsData = await grows.getAll();
        res.status(200).send(growsData);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}