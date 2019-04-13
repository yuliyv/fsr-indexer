'use strict';

const Bottle = require('bottlejs'),
  
  clients = [
    require('./clients/swiftype'),
    require('./clients/pg')
  ],
  
  repos = [
    require('./repos/elastic/tracks'),
    require('./repos/pg/tracks')
  ];

function generateBottle() {
  const bottle = new Bottle();

  function generateNestedFactory(path, modules) {
    const prefix = path.join('.');
  
    modules.map(function (module) {
      const {NAME, build} = module;
  
      /* @todo Nedd to come back to this for top level factory which has no prefix (so avoid the extraneous period here) */
      bottle.factory(`${prefix}.${NAME}`, build);
    })
  }

  generateNestedFactory(['repos', 'clients'], clients);
  generateNestedFactory(['repos'], repos);
  
  return bottle;
}

module.exports = {
  generateBottle
};
