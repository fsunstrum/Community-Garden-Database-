const express = require('express');
const appController = require('./appController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 65534;  // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
app.use(express.static('public'));  // Serve static files from the 'public' directory
app.use(express.json());             // Parse incoming JSON payloads

// mount the router
app.use('/', appController);

// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});