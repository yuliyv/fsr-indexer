'use strict';

module.exports.NAME = 'logClient';
module.exports.build = function () {
  return {
    info: console.info,
    warn: console.warn,
    error: console.error
  }
};
