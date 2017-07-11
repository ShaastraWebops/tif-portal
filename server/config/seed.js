/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';
import Task from  '../api/task/task.model';
export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Task.find({}).remove()
      .then(() => {
        let thing = Task.create({
          title: 'Task-1',
          description: 'This is the first task!',
          deadline: {

            month: "November",
            day: 5,
            year: 2018
          },
          points: 10
        },{
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
      })
    .then(() => console.log('finished populating tasks'))
    .catch(err => console.log('error populating tasks', err));

    User.find({}).remove()
      .then(() => {
        User.create({
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
            fblink: '',
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
