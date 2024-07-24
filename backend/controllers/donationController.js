const Donation = require('../models/donation');
const Receives = require('../models/receives');

exports.createDonation = async (req, res) => {
    const { donation_id, donor_name, date, item, garden_address } = req.body;

    if (!donation_id || !donor_name || !date || !item || !garden_address) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        await Donation.insert({ donation_id, donor_name, date, item });
        await Receives.insert({ donation_id, garden_address });
        res.status(201).send({ message: 'Donation created successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.getAll();
        res.status(200).send(donations);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
