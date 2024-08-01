const donation = require('../models/donation');
const receives = require('../models/receives');

// Controller function to handle creation of new donation
exports.createDonation = async (req, res) => {
    const { donation_id, donor_name, don_date, item, garden_address } = req.body;

    // Make sure all required fields are provided in request body
    if (!donation_id || !donor_name || !don_date || !item || !garden_address) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        const result = await donation.insertDonation({ donation_id, donor_name, don_date, item, garden_address });

        // Send success response if donation inserted successfully, otherwise send error
        if (result) {
            res.status(201).send({ message: 'Donation added successfully!' });
        } else {
            res.status(400).send({ message: 'A donation with the same id already exists!' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// Controller function to get all donations with optional filters
exports.getAllDonations = async (req, res) => {
    const { search, donorName, gardenAddress, date, dateCondition } = req.query;
    try {
        // Attempt to retrieve all donations with the provided filters and send retrieved donations as a response,
        // or error if retrieval failed
        const donations = await donation.donation.getAll(search, donorName, gardenAddress, date, dateCondition);
        res.status(200).send(donations);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Controller function to get all Receives 
exports.getAllReceives = async (req, res) => {
    try {
        // Retrieve all receives tuples and send retrieved tuples as a response,
        // or error ir retrieval failed
        const receivesData = await receives.getAll(); 
        res.status(200).send(receivesData);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};