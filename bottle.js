'use strict';

const Bottle = require('bottlejs'),
  
  clients = [
    require('./clients/log'),
    require('./clients/swiftype'),
    require('./clients/pg')
  ],
  
  repos = [
    require('./repos/elastic/tracks'),
    require('./repos/pg/tracks')
  ],
  
  services = [
    require('./services/extract'),
    require('./services/storage')
  ];

function generateBottle() {
  const bottle = new Bottle();

  /**
   * 
   * @param {string[]} path 
   * @param {NodeModule[]} modules 
   */
  function generateNestedFactory(path, modules) {
    const prefix = path.join('.');
  
    modules.map(function (obj) {
      const {NAME, build} = obj;
  
      bottle.factory(`${prefix}${path.length > 0 ? '.' : ''}${NAME}`, build);
    })
  }

  generateNestedFactory(['repos', 'clients'], clients);
  generateNestedFactory(['repos'], repos);
  generateNestedFactory([], services);
  
  return bottle;
}

module.exports = {
  generateBottle
};
