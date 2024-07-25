const express = require('express');
const donationController = require('../controllers/donationController');
const gardensController = require('../controllers/gardensController');
const managersController = require('../controllers/managersController');

const router = express.Router();

// Create a new donation
router.post('/donations', donationController.createDonation);

// Get all donations
router.get('/donations', donationController.getAllDonations);

// Create a new garden
router.post('/gardens', gardensController.createGarden);

// Get all gardens
router.get('/gardens', gardensController.getAllGardens);

router.get('/managers', managersController.getAllManagers);

module.exports = router;
