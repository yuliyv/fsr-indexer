'use strict';

const _ = require('highland'),
  R = require('ramda');

module.exports.NAME = 'storageService';
module.exports.build = function (container) {
  const {
      extractService,
      repos: {
        elasticTracksRepo
      }
    } = container;

  return {
    storeBatch: async function (batch) {
      const extractedBatch = batch.map(extractService.extractCharacteristics),
        results = await elasticTracksRepo.indexMultiple(extractedBatch);

      return results;
    }
  }
};
