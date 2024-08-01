const express = require('express');
const donationController = require('../controllers/donationController');
const gardensController = require('../controllers/gardensController');
const managersController = require('../controllers/managersController');
const plantController = require('../controllers/plantController');
const growsController = require('../controllers/growsController');
const gardenerController = require('../controllers/gardenerController');
const allController = require('../controllers/allController');

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

// Get all garden addresses
router.get('/gardens/addresses', gardensController.getAllGardenAddresses);

// Get a single garden
router.get('/garden', gardensController.getGarden);

// Get all the planted plots in a garden
router.get('/garden/plots/planted', gardensController.getGardenPlotsPlanted);
// Assign a gardener to a new plot
router.get('/garden/plots', gardensController.getGardenPlots);
router.post('/garden/plots', gardensController.assignGardenerToPlot);
router.delete('/garden/plots', gardensController.unassignGardenerFromPlot);

router.get('/garden/tools', gardensController.getAllToolsForGarden);

// Update tool availability
router.put('/tool/availability', gardensController.updateToolAvailability);

router.get('/gardens/underachievers', growsController.getUnderachievingGardens);

router.get('/managers', managersController.getAllManagers);

// Create a new plant
router.post('/plants', plantController.createPlant); 

// Get all plants
router.get('/plants', plantController.getAllPlants); 

router.get('./grows', plantController.getAllGrows);

router.post('/gardeners', gardenerController.createGardener);

router.get('/gardeners', gardenerController.getAllGardeners);

router.delete('/gardeners', gardenerController.deleteGardeners);

// Update a gardener
router.put('/gardeners', gardenerController.updateGardener);

router.get('/tables', allController.getAllTableNames);
router.get('/table/attrs', allController.getAllAttributesOfTable);
router.get('/table/:table_name', allController.getTable);

module.exports = router;
