const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const appController = require('./routes/appController');
// const idata = require('./dbInit');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 65534;  // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

app.get('/', (req, res) => {
    res.send('Community Gardens API');
});

app.use('/api', apiRoutes);

// mount the router
app.use('/', appController);

// Middleware setup
app.use(express.static('public'));  // Serve static files from the 'public' directory
app.use(express.json());             // Parse incoming JSON payloads

// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    // idata.initializeDatabase();
});