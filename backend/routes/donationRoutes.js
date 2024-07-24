const express = require('express');
const donationController = require('../controllers/donationController');

const router = express.Router();

// Create a new donation
router.post('/donations', donationController.createDonation);

// Get all donations
router.get('/donations', donationController.getAllDonations);

module.exports = router;
