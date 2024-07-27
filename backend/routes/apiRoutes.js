const express = require('express');
const donationController = require('../controllers/donationController');
const gardensController = require('../controllers/gardensController');
const managersController = require('../controllers/managersController');
const plantController = require('../controllers/plantController');
const growsController = require('../controllers/growsController');
const gardenerController = require('../controllers/gardenerController');

const router = express.Router();

// Create a new donation
router.post('/donations', donationController.createDonation);

// Get all donations
router.get('/donations', donationController.getAllDonations);

router.get('/receives', donationController.getAllReceives);

// Create a new garden
router.post('/gardens', gardensController.createGarden);

// Get all gardens
router.get('/gardens', gardensController.getAllGardens);

// Get a single garden
router.get('/garden', gardensController.getGarden);
router.get('/garden/plots', gardensController.getGardenPlots);

router.get('/gardens/underachievers', growsController.getUnderachievingGardens);

router.get('/managers', managersController.getAllManagers);

// Create a new plant
router.post('/plants', plantController.createPlant); 

// Get all plants
router.get('/plants', plantController.getAllPlants); 

router.post('/gardeners', gardenerController.createGardener);

router.get('/gardeners', gardenerController.getAllGardeners);

module.exports = router;
