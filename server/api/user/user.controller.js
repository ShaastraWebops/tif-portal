'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
var json2csv = require('json2csv');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

export function list(req, res) {
  return User.find({submitted: true}, '-_id -salt -password -provider -role').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

export function exp(req, res) {
  return User.find({submitted: true}, '-_id -salt -password -provider -role').exec()
    .then(users => {
      var fields = ['name', 'email', 'college.address', 'college.city', 'college.name', 'college.state',
      'education.branch', 'education.degree', 'education.year', 'phonenumber', 'previous', 'prevyear',
      'postal.address', 'postal.city', 'postal.pin', 'postal.state', 'questions.past', 'questions.right',
      'questions.why', 'social', 'wnumber', 'fblink'];
      var csv = json2csv({ data: users, fields: fields});
      res.setHeader('Content-disposition', 'attachment; filename=users.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

export function submit(req, res) {
  return User.findById(req.user._id).exec()
    .then(user => {
      user.phonenumber = req.body.phonenumber;
      user.wnumber = req.body.wnumber;
      user.previous = req.body.previous;
      user.prevyear = req.body.prevyear;
      user.social = req.body.social;
      user.fblink = req.body.fblink;
      user.college.name = req.body.college.name;
      user.college.address = req.body.college.address;
      user.college.city = req.body.college.city;
      user.college.state = req.body.college.state;
      user.education.degree = req.body.education.degree;
      user.education.branch = req.body.education.branch;
      user.education.year = req.body.education.year;
      user.postal.address = req.body.postal.address;
      user.postal.city = req.body.postal.city;
      user.postal.state = req.body.postal.state;
      user.postal.pin = req.body.postal.pin;
      user.questions.why = req.body.questions.why;
      user.questions.right = req.body.questions.right;
      user.questions.past = req.body.questions.past;
      user.submitted = true;
      return user.save()
        .then(() => {
          res.json({success: true});
        })
        .catch(handleError(res));
    });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
