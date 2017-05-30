'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:3000',
  SESSION_SECRET: 'caportal-secret',

  FACEBOOK_ID: 'facebook-id',
  FACEBOOK_SECRET: 'facebook-secret',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
