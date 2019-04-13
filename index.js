'use strict';

require('dotenv').config();

const _ = require('highland'),
  {generateBottle} = require('./bottle'),
  bottle = generateBottle(),
  {storageService, repos: {pgTracksRepo, clients: {logClient}}} = bottle.container;

_(pgTracksRepo.getTrackStream())
  .batch(20)
  .map((batch) => {
    return _(storageService.storeBatch(batch));
  })
  .mergeWithLimit(1)
  .each((resp) => logClient.info('Indexed Batch', { ids: resp }))
  .done(() => process.exit(0));
