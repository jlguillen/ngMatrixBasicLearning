// /index.js
'use strict';

var server = require('./config/initializers/server');
var nconf = require('nconf');

// Load Environment variables from .env file
require('dotenv').load();

// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();
// Load config file for the environment
require('./config/environments/' + nconf.get('NODE_ENV'));

// Initialize Modules

server.start();

