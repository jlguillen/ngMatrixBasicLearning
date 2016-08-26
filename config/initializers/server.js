var start, express = require('express'),
  config = require('nconf'),
  path = require('path'),
  logger = require('winston'),
  bodyParser = require('body-parser');

start = function() {
  'use strict';
  // Configure express
  var app = express();

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json({
    type: '*/*'
  }));

  logger.info('[SERVER] Initializing routes');
  app.use('/static', express.static(path.join(__dirname, '../../public')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/admin', 'index.html'));
  });
  app.get('*', function(req, res) {
    res.redirect('/');
  });
  app.listen(config.get('NODE_PORT'));
  logger.info('[SERVER] Listening on port ' + config.get('NODE_PORT'));
};

exports.start = start;

