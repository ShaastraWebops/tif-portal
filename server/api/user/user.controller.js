'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
const sendgrid = require("sendgrid")(process.env.CASITE);
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
  return User.find({submitted: true}, '-salt -password -provider -role').exec()
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
  return newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      var text_body = "Hello "+user.name+ ",\n\n Greetings from Shaastra 2018, IIT Madras! \n\nThank you for signing up for the Shaastra Campus Ambassador Program. Please complete the questionnaire on the portal by 25th August 2017.\n You will be intimidated by mail if you are selected to become a Campus Ambassador. Meanwhile please like and follow our Facebook page: fb.com/Shaastra for updates.\n If you have any queries contact us on studentrelations@shaastra.org \n\n\nRegards, \nTeam Shaastra \n IIT Madras ";
var receiver = user.email;
    var params = {
        to: receiver,
        from: 'studentrelations@shaastra.org',
        //cc: 'summitregistrations@shaastra.org',
        fromname: 'Student Relations, Shaastra',
        subject: 'Shaastra 2018 || Campus Ambassador',
        text: text_body
    };
    console.log(params);
    var email = new sendgrid.Email(params);
    console.log(email);
    sendgrid.send(email, function (err, json) {
      if(err)
        console.log('Error sending mail - ', err);
      else
        {
          console.log('Success sending mail - ', json);
        }
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

export function select(req, res) {
  return User.findById(req.params.id).exec()
    .then(function(user) {
      if(!user)
      {
        res.json({success: false,message: "No User found"});
      }
      else{
      user.selected=1;
      return user.save()
        .then(() => {
          var text_body = "Hello "+user.name+ ",\n\n Greetings from Shaastra 2018, IIT Madras! \n\nFirst of all, congratulations on being selected as a Campus Ambassador for your college. We would like to welcome you to the team behind India’s largest completely student-run technical extravaganza - Shaastra 2018.\nWith a strong team of 500 students of IIT Madras and hundreds of Campus Ambassadors across India, Shaastra 2018 aims to give the best technical experience to everyone in the country ranging from school students to engineers of the future.\nWith this in mind, we hope you have an amazing journey working with us as you represent your college.\nFurther instructions and information would be communicated to you shortly. We request you to keep checking the CA Portal as well as your email.\n\nLooking forward to work with you.\n\nRegards,\nTeam Shaastra\nIIT Madras";
        var params = {
            to: user.email,
            from: 'studentrelations@shaastra.org',
            //cc: 'summitregistrations@shaastra.org',
            fromname: 'Student Relations, Shaastra',
            subject: 'Shaastra 2018 || Campus Ambassador',
            text: text_body
        };
        console.log(params);
        var email = new sendgrid.Email(params);
        console.log(email);
        sendgrid.send(email, function (err, json) {
          if(err)
            console.log('Error sending mail - ', err);
          else
            {
              console.log('Success sending mail - ', json);
            }
        });
          res.json({success: true, message: "User updated"});
        })
        .catch(handleError(res));
     }
    })
    .catch(handleError(res));
}

export function reject(req, res) {
  return User.findById(req.params.id).exec()
    .then(function(user) {
      if(!user)
      {
        res.status(400).json({message: "No User found"});
      }
      else{
      user.selected=2;
      var name=user.name,email=user.email;
      return user.save()
        .then(() => {
          var text_body = "Hello "+name+ ",\n\n Greetings from Shaastra 2018, IIT Madras! \n\nWe regret to inform you that your application for being a Shaastra Campus Ambassador couldn’t be accommodated. However, lose hope not, for you can try again for next year - which will see a bigger CA Program.\nTill then, get a feel of Shaastra - visit the IIT Madras campus in January and experience the largest student-run technical extravaganza. With a host of workshops, international competitions, lectures, exhibitions and shows, Shaastra is bound to amaze you.\n\nWe look forward to see you at Shaastra 2018, and as a Campus Ambassador next year!\n\nRegards,\nTeam Shaastra\nIIT Madras";
        var params = {
            to: email,
            from: 'studentrelations@shaastra.org',
            //cc: 'summitregistrations@shaastra.org',
            fromname: 'Student Relations, Shaastra',
            subject: 'Shaastra 2018 || Campus Ambassador',
            text: text_body
        };
        var email = new sendgrid.Email(params);
        console.log(email);
        sendgrid.send(email, function (err, json) {
          if(err)
            console.log('Error sending mail - ', err);
          else
            {
              console.log('Success sending mail - ', json);
            }
        });
          res.status(200).json({message: "User updated"});
        })
        .catch(handleError(res));
     }
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
