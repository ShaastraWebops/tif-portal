'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + process.env.DEV_USER + ':' + process.env.DEV_PASSWORD + '@localhost/caportal-dev',
  },

  // Seed database on startup
  seedDB: true

};
