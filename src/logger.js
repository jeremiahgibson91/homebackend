/* eslint-env node */
'use strict';

const winston = require('winston');

function Logger(app) {
  // Logging
  // winston.log('info', 'Hello distributed log files!');
  // winston.info('Hello again distributed logs');
  // winston.level = 'debug';
  // winston.log('debug', 'Now my debug messages are written to console!');
  return winston;
}

module.exports = Logger;
