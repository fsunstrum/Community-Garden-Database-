const gi = require('../models/gardenInfo');
const GardenManages = require('../models/gardenManages');

exports.createGarden = async (req, res) => {
    const { address, garden_name, num_of_plots } = req.body;

    if (!garden_name || !address || !num_of_plots) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        const result = await gi.insertGarden({ address, garden_name, num_of_plots });

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

exports.getGarden = async (req, res) => {
    const garden_name =  req.query.name;

    if (!garden_name) return res.status(400).send({ message: "No garden was specified in the request."});

    try {
        const gardens = await gi.getGarden(garden_name);
        if (gardens.length > 1) return res.status(400).send({ message : "Multiple gardens were found." });
        else if (gardens.length < 1) return res.status(400).send({ message: "The specified garden was not found." });
        else return res.status(200).send(gardens[0]);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.getGardenPlots = async (req, res) => {
    const address = req.query.address;
    console.log(address);

    if (!address) return res.status(400).send({ message: "No garden address was specified in the request."});

    try {
        const gardenPlots = await gi.getGardenPlots(address);
        return res.status(200).send(gardenPlots);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.getGardenPlotsPlanted = async (req, res) => {
    const garden_name = req.query.name;

    if (!garden_name) return res.status(400).send({ message: "No garden was specified in the request."});

    try {
        const gardenPlots = await gi.getGardenPlotsPlanted(garden_name);
        return res.status(200).send(gardenPlots);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.assignGardenerToPlot = async (req, res) => {
    const { garden_address, gardener_email, plot_num } = req.body;

    if (!garden_address || !gardener_email || !plot_num) return res.status(400).send({ message: "All fields are required!" });

    console.log({garden_address, gardener_email, plot_num});

    try {
        const result = await gi.assignGardenerToPlot(garden_address, gardener_email, plot_num);
        result ? res.status(200).send({ message: `The gardener was assigned to plot #${plot_num} successfully.` }) : 
        res.status(400).send({ message: `The gardener was unable to be assigned.` })
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};