'use strict';

const R = require('ramda');

module.exports.NAME = 'elasticTracksRepo';
module.exports.build = function(container) {
  const {clients: {logClient, swiftypeClient}} = container,
    engineName = 'freesound-radio-tracks';

  return {
    indexTrack: async function(document) {
      try {
        const result = await swiftypeClient.indexDocuments(
            engineName,
            [
              document
            ]
          ),
          {} = result;

        return result;
      } catch(err) {
        logClient.error('Failed to Index Document', {
          messages: err.errorMessages
        });

        return null;
      }
    },
    indexMultiple: async function (documents) {
      logClient.info('Indexing Documents', {
        count: documents.length
      });

      try {
        const result = await swiftypeClient.indexDocuments(
            engineName,
            documents
          ),
          ids = R.pluck('id', result),
          errors = R.pluck('errors', result);

        return ids;
      } catch(err) {
        logClient.error('Failed to Index Documents', {
          messages: err.errorMessages
        });

        return null;
      }
    }
  };
};
