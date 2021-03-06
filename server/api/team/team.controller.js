'use strict';

import Team from './team.model';
import User from '../user/user.model'
import config from '../../config/environment';
var json2csv = require('json2csv');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    // console.log(err);
    return res.status(statusCode).send(err);
  };
}

export function getTeam(req, res) {
  Team.findOne({ 'teamname': req.params.teamName }).then(team => {
    res.json(team);
  });
}

export function exp(req, res) {
  return Team.find({}, '-_id').exec()
    .then(teams => {
      var fields = ['projlink', 'projdetails', 'vertical', 'projname',
      'points', 'questions.what', 'questions.howbetter', 'questions.past', 'teammates.mem1_name', 'teammates.mem1_email', 'teammates.mem1_phno',
      'teammates.mem2_name', 'teammates.mem2_email', 'teammates.mem2_phno', 'teammates.mem3_name', 'teammates.mem3_email', 'teammates.mem3_phno'];
      var csv = json2csv({ data: teams, fields: fields});
      res.setHeader('Content-disposition', 'attachment; filename=teams.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    })
    .catch(handleError(res));
}

export function teamsubmit(req, res) {
  // console.log(req.body);
  User.findOne({ 'email': req.body.email })
    .then(user => {
      user.teamname = req.body.teamname;
      user.save();
    });
  Team.findOne({ 'teamname': req.body.teamname }).then(team => {
    if (team) {
      if (team.teammates.mem1_email === req.body.email || team.teammates.mem2_email === req.body.email || team.teammates.mem3_email === req.body.email || team.teammates.mem4_email === req.body.email) {
        team.teammates.mem1_name = req.body.name|| null;
        team.teammates.mem1_email = req.body.email || null;
        team.teammates.mem1_phno = req.body.phonenumber || null;
        team.teamname = req.body.teamname || null;
        // if(user.teammates==undefined)user.teammates={};
        // if(user.questions==undefined)user.questions={};
        team.teammates.mem2_name = req.body.teammates.mem2_name || null;
        team.teammates.mem2_email = req.body.teammates.mem2_email || null;
        team.teammates.mem2_phno = req.body.teammates.mem2_phno || null;
        team.teammates.mem3_name = req.body.teammates.mem3_name || null;
        team.teammates.mem3_email = req.body.teammates.mem3_email || null;
        team.teammates.mem3_phno = req.body.teammates.mem3_phno || null;
        team.teammates.mem4_name = req.body.teammates.mem4_name || null;
        team.teammates.mem4_email = req.body.teammates.mem4_email || null;
        team.teammates.mem4_phno = req.body.teammates.mem4_phno || null;
        team.teammates.mem5_name = req.body.teammates.mem5_name || null;
        team.teammates.mem5_email = req.body.teammates.mem5_email || null;
        team.teammates.mem5_phno = req.body.teammates.mem5_phno || null;
        team.teammates.mem6_name = req.body.teammates.mem6_name || null;
        team.teammates.mem6_email = req.body.teammates.mem6_email || null;
        team.teammates.mem6_phno = req.body.teammates.mem6_phno || null;
        team.projname = req.body.projname || '';
        team.vertical = req.body.vertical || '';
        team.projdetails = req.body.projdetails || '';
        team.projlink = req.body.projlink || '';
        team.questions.what = req.body.questions.what || '';
        team.questions.howbetter = req.body.questions.howbetter || '';
        team.questions.past = req.body.questions.past || '';
        team.submitted = req.params.state;
        team.save(function(err) {
          if (err) throw err;
          if (req.body.teammates.mem2_email) {
            User.findOne({ 'email': req.body.teammates.mem2_email })
              .then(user => {
                user.teamname = req.body.teamname;
                user.save();
              });
          }
          if (req.body.teammates.mem3_email) {
            User.findOne({ 'email': req.body.teammates.mem3_email })
              .then(user => {
                user.teamname = req.body.teamname;
                user.save();
              });
          }
          if (req.body.teammates.mem4_email) {
            User.findOne({ 'email': req.body.teammates.mem4_email })
              .then(user => {
                user.teamname = req.body.teamname;
                user.save();
              });
          }
          res.json({success: true});
        });
      } else {
        res.json({success: false});
      }
    } else {
      var team = new Team();
          // user.phonenumber = req.body.phonenumber;
          // user.wnumber = req.body.wnumber;
          // user.previous = req.body.previous;
          // user.college.name = req.body.college.name;
          // user.college.address = req.body.college.address;
          // user.college.city = req.body.college.city;
          // user.college.state = req.body.college.state;
          // user.education.degree = req.body.education.degree;
          // user.education.branch = req.body.education.branch;
          // user.education.year = req.body.education.year;
          // user.postal.address = req.body.postal.address;
          // user.postal.city = req.body.postal.city;
          // user.postal.state = req.body.postal.state;
          // user.postal.pin = req.body.postal.pin;
          team.teammates.mem1_name = req.body.name|| null;
          team.teammates.mem1_email = req.body.email || null;
          team.teammates.mem1_phno = req.body.phonenumber || null;
          team.teamname = req.body.teamname || null;
          // if(user.teammates==undefined)user.teammates={};
          // if(user.questions==undefined)user.questions={};
          team.teammates.mem2_name = req.body.teammates.mem2_name || null;
          team.teammates.mem2_email = req.body.teammates.mem2_email || null;
          team.teammates.mem2_phno = req.body.teammates.mem2_phno || null;
          team.teammates.mem3_name = req.body.teammates.mem3_name || null;
          team.teammates.mem3_email = req.body.teammates.mem3_email || null;
          team.teammates.mem3_phno = req.body.teammates.mem3_phno || null;
          team.teammates.mem4_name = req.body.teammates.mem4_name || null;
          team.teammates.mem4_email = req.body.teammates.mem4_email || null;
          team.teammates.mem4_phno = req.body.teammates.mem4_phno || null;
          team.teammates.mem5_name = req.body.teammates.mem5_name || null;
          team.teammates.mem5_email = req.body.teammates.mem5_email || null;
          team.teammates.mem5_phno = req.body.teammates.mem5_phno || null;
          team.teammates.mem6_name = req.body.teammates.mem6_name || null;
          team.teammates.mem6_email = req.body.teammates.mem6_email || null;
          team.teammates.mem6_phno = req.body.teammates.mem6_phno || null;
          team.projname = req.body.projname || '';
          team.vertical = req.body.vertical || '';
          team.projdetails = req.body.projdetails || '';
          team.projlink = req.body.projlink || '';
          team.questions.what = req.body.questions.what || '';
          team.questions.howbetter = req.body.questions.howbetter || '';
          team.questions.past = req.body.questions.past || '';
          team.submitted = req.params.state;
          team.save(function(err) {
            if (err) throw err;
            if (req.body.teammates.mem2_email) {
              User.findOne({ 'email': req.body.teammates.mem2_email })
                .then(user => {
                  user.teamname = req.body.teamname;
                  user.save();
                });
            }
            if (req.body.teammates.mem3_email) {
              User.findOne({ 'email': req.body.teammates.mem3_email })
                .then(user => {
                  user.teamname = req.body.teamname;
                  user.save();
                });
            }
            if (req.body.teammates.mem4_email) {
              User.findOne({ 'email': req.body.teammates.mem4_email })
                .then(user => {
                  user.teamname = req.body.teamname;
                  user.save();
                });
            }
            res.json({success: true});
          });
    }
  });
}
