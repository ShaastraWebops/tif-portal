/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");  //if any error comes Access-Control-Allow-Methods not given or so, just add it here
    next();
});
  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth').default);

  app.get('/image/:url', function (req, res) {
    if(req.params.url === "Noname")
    {
      res.send("No File Uploaded  ");
    }
    res.sendFile(path.resolve('./client/assets/uploads/' + req.params.url));
});

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
