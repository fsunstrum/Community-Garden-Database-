const gi = require('../models/gardenInfo');
const GardenManages = require('../models/gardenManages');
// const { assignGardenerToPlot, unassignGardenerFromPlot } = require('../models/gardenerPlot');


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

exports.deleteGarden = async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).send({ message: 'Garden address is required!' });
    }

    try {
        const result = await gi.deleteGarden(address);

        if (result) res.status(200).send({ message: 'Garden deleted successfully!' });
        else res.status(400).send({ message: 'Failed to delete garden!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
};

exports.getAllGardens = async (req, res) => {
    const minPlots = parseInt(req.query.minPlots);
    
    try {
        let gardens;
        if (!minPlots || isNaN(minPlots)) gardens = await gi.getAllGardens();
        else gardens = await gi.getAllGardens(minPlots);
        
        res.status(200).send(gardens);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllGardenAddresses = async (req, res) => {
    try {
        const gardenAddresses = await gi.getAllGardenAddresses();
        res.status(200).send(gardenAddresses);
    } catch (err) {
        console.error(err.message);
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

    if (!address) return res.status(400).send({ message: "No garden address was specified in the request."});

    try {
        const gardenPlots = await gi.getGardenPlots(address);
        return res.status(200).send(gardenPlots);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.getAllToolsForGarden = async (req, res) => {
    const address = req.query.address;

    if (!address) return res.status(400).send({ message: "No garden address was specified in the request."});

    try {
        const tools = await gi.getAllToolsForGarden(address);
        res.status(200).send(tools);
    } catch (err) {
        res.status(500).send({ message: err.message });
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

    try {
        const result = await gi.assignGardenerToPlot(garden_address, gardener_email, plot_num);
        // const result = await assignGardenerToPlot(garden_address, gardener_email, plot_num);
        result ? res.status(200).send({ message: `The gardener was assigned to plot #${plot_num} successfully.` }) : 
        res.status(400).send({ message: `The gardener was unable to be assigned.` })
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.unassignGardenerFromPlot = async (req, res) => {
    const { garden_address, plot_num } = req.body;

    if (!garden_address || !plot_num) return res.status(400).send({ message: "All fields are required!" });

    try {
        const result = await gi.unassignGardenerFromPlot(garden_address, plot_num);
        // const result = await unassignGardenerFromPlot(garden_address, plot_num);
        result ? res.status(200).send({ message: `The gardener was unassigned from plot #${plot_num} successfully.` }) : 
        res.status(400).send({ message: `The gardener was unable to be unassigned.` })
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};