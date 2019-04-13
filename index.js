'use strict';

require('dotenv').config();

const _ = require('highland'),
  {generateBottle} = require('./bottle'),
  bottle = generateBottle(),
  {storageService} = bottle.container;

storageService
  .storeSingle(5285)
  .then(data => {
    process.exit(0);
  });
