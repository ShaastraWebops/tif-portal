'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:3000',
  SESSION_SECRET: 'caportal-secret',

  GOOGLE_ID: '462796761885-esnmrkb4au8nldcs5fb7bo1ull7rskrt.apps.googleusercontent.com',
  GOOGLE_SECRET: ' XM5Lh2a65yeDkKvBegc32rst ',
 callbackURL: 'http://localhost:3001/auth/google/callback',
  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
};
