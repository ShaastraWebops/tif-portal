'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.apply = apply;
exports.getusers = getusers;
exports.show = show;
exports.gettasks = gettasks;

var _task = require('./task.model');

var _task2 = _interopRequireDefault(_task);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * Creates a new user
 */
function create(req, res) {
  var newTask = new _task2.default(req.body);
  newTask.save().then(function () {
    res.json({ success: true, message: 'New Task Created' });
  }).catch(validationError(res));
}

function apply(req, res) {
  var userid = req.user._id;
  var taskid = req.params.id;
  var error = false;
  return _task2.default.findById(taskid).exec().then(function (task) {
    if (!task) {
      res.json({ success: false, message: "No such task available" });
    }
    _task2.default.update({ _id: taskid }, { $addToSet: { pending: userid } }, function (err, msg) {
      if (err) throw err;
      if (msg.nModified == 0) //1 in console
        {
          res.json({ success: false, message: 'Already applied' });
        } else {
        res.json({ success: true, message: 'Applied' });
      }
    });
  });
}

function getusers(req, res) {

  var id = req.params.id;
  _user2.default.find({ 'files.taskid': id }).exec().then(function (users) {
    if (!users) {
      res.json({ success: false, message: "Users no longer exists" });
    } else {
      res.json({ success: true, users: users });
    }
  }).catch(handleError(res));
}

function show(req, res) {
  var taskId = req.params.id;

  return _task2.default.findById(taskId).exec().then(function (task) {
    if (!task) {
      return res.status(404);
    }
    res.json({ success: true, task: task });
  }).catch(handleError(res));
}

function gettasks(req, res) {

  var userid = req.user._id;
  _task2.default.find({}).exec().then(function (tasks) {
    res.status(200).json({ tasks: tasks, userid: userid });
  }).catch(handleError(res));
}
//# sourceMappingURL=task.controller.js.map
