'use strict';

import Task from './task.model';

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
          res.json({success: false, message : "No such task available"});
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

export function gettasks(req, res) {
  Task.find({}).exec()
  .then(tasks => {
    res.status(200).json(tasks);
  })
  .catch(handleError(res));
}
