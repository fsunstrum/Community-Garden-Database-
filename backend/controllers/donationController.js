// const Donation = require('../models/donation');
const donation = require('../models/donation');
const receives = require('../models/receives');

exports.createDonation = async (req, res) => {
    const { donation_id, donor_name, don_date, item, garden_address } = req.body;

    if (!donation_id || !donor_name || !don_date || !item || !garden_address) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        console.log("Inserting Donation:", { donation_id, donor_name, don_date, item, garden_address });
        const result = await donation.insertDonation({ donation_id, donor_name, don_date, item, garden_address });

        if (result) {
            res.status(201).send({ message: 'Donation added successfully!' });
        } else {
            res.status(400).send({ message: 'A donation with the same id already exists!' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllDonations = async (req, res) => {
    const { search } = req.query;
    try {
        const donations = await donation.donation.getAll(search);
        res.status(200).send(donations);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllReceives = async (req, res) => {
    try {
        const receivesData = await receives.getAll(); 
        res.status(200).send(receivesData);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};