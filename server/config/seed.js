/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        let thing = Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
        return thing;
      })
    .then(() => console.log('finished populating things'))
    .catch(err => console.log('error populating things', err));

    User.find({}).remove()
      .then(() => {
        User.create({
          name: 'John',
          email: 'john@mail.com',
          submitted: true,
          role: 'user',
          password: 'john',
          phonenumber: 123456789,
          wnumber: 987654321,
          college: {
            name: 'Johns College',
            address: 'Johns Colleges Address',
            city: 'Johns Colleges city',
            state: 'city!'
          },
          education: {
            degree: 'Johns degree',
            branch: 'Johns branch',
            year: 'year!'
          },
          postal: {
            address: 'Johns address',
            city: 'Johns city',
            state: 'Johns state',
            pin: 'pin!'
          },
          previous: false,
          social: 'Johns social!!!',
          fblink: 'johnDoe',
          questions: {
            why: 'CA is great you have got to be one!!!',
            right: 'I dont know what this means!',
            past: 'you dont want to know'
          }
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        },
          {
            name: 'Daren',
            email: 'daren@mail.com',
            submitted: true,
            role: 'user',
            password: 'daren',
            phonenumber: 7892340982,
            wnumber: 7892340982,
            college: {
              name: 'Darens College',
              address: 'Darens Colleges Address',
              city: 'Darens Colleges city',
              state: 'city!'
            },
            education: {
              degree: 'Darens degree',
              branch: 'Darens branch',
              year: 'year!'
            },
            postal: {
              address: 'Darens address',
              city: 'Darens city',
              state: 'Darens state',
              pin: 'pin!'
            },
            previous: false,
            social: 'Darens social!!!',
            fblink: 'daren_fblink',
            questions: {
              why: 'Getting famous and also no age restriction so ...!!!',
              right: 'Even I dont know  what this means!',
              past: 'I was born yesterday'
            }
          })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
