/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import config from './environment/';
export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    // User.find({}).remove()
    //   .then(() => {
    //     User.create({
    //       provider: 'local',
    //       role: 'admin',
    //       name: 'Admin',
    //       email: 'studentrelations@shaastra.org',
    //       password: 'admin'
    //     })
    //     .then(() => console.log('finished populating users'))
    //     .catch(err => console.log('error populating users', err));
    //   });
  }
}