const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectToDatabase = require('./config/db');
const cors = require('cors');// CORS = Cross-Origin Resource Sharing

require('dotenv').config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));//To Handle url encoded data for form submissions or in query parameters.(params)
app.use(bodyParser.json());

const corsOptions = {
    origin: process.env.RFRONTEND_URL || 'http://localhost:3000'
};
app.use(cors(corsOptions));
app.options('*', cors()); // To Handle preflight requests


connectToDatabase();


const routes = require('../backend/routes/index');
app.use('/', routes);

const port = 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
