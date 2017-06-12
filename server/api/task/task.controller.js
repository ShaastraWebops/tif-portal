'use strict';

import Task from './task.model';
import User from '../user/user.model';

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

/**
 * Creates a new user
 */
export function create(req, res) {
  var newTask = new Task(req.body);
  newTask.save()
    .then(function() {
      res.json({success: true, message: 'New Task Created'});
    })
    .catch(validationError(res));
}

export function apply(req, res) {
    var userid = req.user._id;
    var taskid = req.params.id;
    var error = false;
    return Task.findById(taskid).exec()
      .then(task => {
        if(!task) {
        return res.json({success: false, message : "No such task available"});
        }
        Task.update({_id:taskid},{$addToSet:{pending: userid}}, function(err,msg){
        if(err) throw err;
        if(msg.nModified == 0) //1 in console
          {
            res.json({success: false, message: 'Already applied'});
          }
          else {
            res.json({success: true, message: 'Applied'});
          }
       });

    });
}

export function getusers(req, res) {

  var id = req.params.id;
  User.find({'files.taskid': id}).exec()
  .then(users => {
    if(!users){
      res.json({success: false, message: "Users no longer exists"});
    }
    else {
      res.json({success: true, users: users});
    }
  })
  .catch(handleError(res));
}

export function show(req, res) {
  var taskId = req.params.id;

  return Task.findById(taskId).exec()
    .then(task => {
      if(!task) {
        return res.status(404);
      }
      res.json({success: true, task: task});
    })
    .catch(handleError(res));
}

export function gettasks(req, res) {

  var userid = req.user._id;
  Task.find({}).exec()
  .then(tasks => {
    res.status(200).json({tasks: tasks, userid: userid});
  })
  .catch(handleError(res));
}

export function approve(req, res) {

  var taskId = req.params.id;
  var userid = req.body.userid;

  Task.findById(taskId).exec()
  .then(task => {
    if(!task) {

      return res.json({success: false, msg: "no such tasks exists!"});
    }
    var points = task.points;
    Task.update({_id: taskId}, {$addToSet:{approved: userid}}, function(err, msg){

      if (err) throw err;
      if(msg.nModified == 0) {

        res.json({success: false, msg: 'Already approved!'});
      }
      else {
        res.json({success: true, msg: "Approved!"});
        User.update({_id: userid}, {$inc: {points: points}}, function(err, msg) {

          if (err) throw err;
        });
      }
    });
  });
}
