'use strict';

module.exports.NAME = 'elasticTracksRepo';
module.exports.build = function(container) {
  const {clients: {swiftypeClient}} = container,
    engineName = 'freesound-radio-tracks';

  return {
    indexTrack: function(document) {
      return swiftypeClient.indexDocuments(
        engineName,
        [
          document
        ]
      );
    }
  };
};
