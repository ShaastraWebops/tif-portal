/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = seedDatabaseIfNeeded;

var _thing = require('../api/thing/thing.model');

var _thing2 = _interopRequireDefault(_thing);

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _environment = require('./environment/');

var _environment2 = _interopRequireDefault(_environment);

var _task = require('../api/task/task.model');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function seedDatabaseIfNeeded() {
  if (_environment2.default.seedDB) {
    _task2.default.find({}).remove().then(function () {
      var thing = _task2.default.create({
        title: 'Task-1',
        description: 'This is the first task!',
        deadline: {

          month: "November",
          day: 5,
          year: 2018
        },
        points: 10
      }, {
        title: "Task-2",
        description: "This is the second task!",
        deadline: {
          month: "December",
          day: 6,
          year: 2019
        },
        points: 10
      });
      return thing;
    }).then(function () {
      return console.log('finished populating tasks');
    }).catch(function (err) {
      return console.log('error populating tasks', err);
    });

    _user2.default.find({}).remove().then(function () {
      _user2.default.create({
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }, {
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
        fblink: '',
        questions: {
          why: 'Getting famous and also no age restriction so ...!!!',
          right: 'Even I dont know  what this means!',
          past: 'I was born yesterday'
        }
      }).then(function () {
        return console.log('finished populating users');
      }).catch(function (err) {
        return console.log('error populating users', err);
      });
    });
  }
}
//# sourceMappingURL=seed.js.map
