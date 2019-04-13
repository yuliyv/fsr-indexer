'use strict';

const AppSearchClient = require('swiftype-app-search-node'),
  Environment = require('../environment.js');

module.exports.NAME = 'swiftypeClient';
module.exports.build = function() {
  return new AppSearchClient(Environment.SWIFTYPE_HOST, Environment.SWIFTYPE_KEY);
}
