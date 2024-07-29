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

// Get donation attributes
router.get('/donations/attributes', donationController.getDonationsAttributes);

// Get donation data based on selected attributes
router.get('/donations/data', donationController.getDonationsData);

// Create a new garden
router.post('/gardens', gardensController.createGarden);

// Get all gardens
router.get('/gardens', gardensController.getAllGardens);

// Get all garden addresses
router.get('/gardens/addresses', gardensController.getAllGardenAddresses);

// Get a single garden
router.get('/garden', gardensController.getGarden);

// Delete a garden
router.delete('/gardens', gardensController.deleteGarden);

// Get all the planted plots in a garden
router.get('/garden/plots/planted', gardensController.getGardenPlotsPlanted);
// Assign a gardener to a new plot
router.get('/garden/plots', gardensController.getGardenPlots);
router.post('/garden/plots', gardensController.assignGardenerToPlot);
router.delete('/garden/plots', gardensController.unassignGardenerFromPlot);

router.get('/gardens/underachievers', growsController.getUnderachievingGardens);

router.get('/managers', managersController.getAllManagers);

// Create a new plant
router.post('/plants', plantController.createPlant); 

// Get all plants
router.get('/plants', plantController.getAllPlants); 

router.post('/gardeners', gardenerController.createGardener);

router.get('/gardeners', gardenerController.getAllGardeners);

router.delete('/gardeners', gardenerController.deleteGardeners);

// Update a gardener
router.put('/gardeners', gardenerController.updateGardener);



module.exports = router;
