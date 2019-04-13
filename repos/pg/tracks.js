'use strict';

module.exports.NAME = 'pgTracksRepo';
module.exports.build = function (container) {
  const {clients: {pgClient}} = container,
    baseTable = pgClient('track');

  return {
    getTrackById: async function (id) {
      return await baseTable.where({id}).first();
    },
    getTrackStream: function () {
      return baseTable.orderBy('id', 'asc').stream();
    }
  };
};
