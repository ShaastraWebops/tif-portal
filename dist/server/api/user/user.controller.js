'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.list = list;
exports.exp = exp;
exports.create = create;
exports.show = show;
exports.submit = submit;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.me = me;
exports.authCallback = authCallback;

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var json2csv = require('json2csv');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  return _user2.default.find({}, '-salt -password').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}

function list(req, res) {
  return _user2.default.find({ submitted: true }, '-_id -salt -password -provider -role').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}

function exp(req, res) {
  return _user2.default.find({ submitted: true }, '-_id -salt -password -provider -role').exec().then(function (users) {
    var fields = ['name', 'email', 'college.address', 'college.city', 'college.name', 'college.state', 'education.branch', 'education.degree', 'education.year', 'phonenumber', 'previous', 'prevyear', 'postal.address', 'postal.city', 'postal.pin', 'postal.state', 'questions.past', 'questions.right', 'questions.why', 'social', 'wnumber'];
    var csv = json2csv({ data: users, fields: fields });
    res.setHeader('Content-disposition', 'attachment; filename=users.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  }).catch(handleError(res));
}

/**
 * Creates a new user
 */
function create(req, res) {
  var newUser = new _user2.default(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save().then(function (user) {
    var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
      expiresIn: 60 * 60 * 5
    });
    res.json({ token: token });
  }).catch(validationError(res));
}

/**
 * Get a single user
 */
function show(req, res, next) {
  var userId = req.params.id;

  return _user2.default.findById(userId).exec().then(function (user) {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user.profile);
  }).catch(function (err) {
    return next(err);
  });
}

function submit(req, res) {
  return _user2.default.findById(req.user._id).exec().then(function (user) {
    user.phonenumber = req.body.phonenumber;
    user.wnumber = req.body.wnumber;
    user.previous = req.body.previous;
    user.prevyear = req.body.prevyear;
    user.social = req.body.social;
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
    return user.save().then(function () {
      res.json({ success: true });
    }).catch(handleError(res));
  });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req, res) {
  return _user2.default.findByIdAndRemove(req.params.id).exec().then(function () {
    res.status(204).end();
  }).catch(handleError(res));
}

/**
 * Change a users password
 */
function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return _user2.default.findById(userId).exec().then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      return user.save().then(function () {
        res.status(204).end();
      }).catch(validationError(res));
    } else {
      return res.status(403).end();
    }
  });
}

/**
 * Get my info
 */
function me(req, res, next) {
  var userId = req.user._id;

  return _user2.default.findOne({ _id: userId }, '-salt -password').exec().then(function (user) {
    // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  }).catch(function (err) {
    return next(err);
  });
}

/**
 * Authentication callback
 */
function authCallback(req, res) {
  res.redirect('/');
}
//# sourceMappingURL=user.controller.js.map
