'use strict';

require('dotenv').config();

const _ = require('highland'),
  {generateBottle} = require('./bottle'),
  bottle = generateBottle(),
  {repos} = bottle.container;

_(repos.pgTracksRepo.getTrackStream())
  .slice(0, 1)
  .each(_.log)
  .done(() => {
    process.exit(0);
  })
