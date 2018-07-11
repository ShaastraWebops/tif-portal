'use strict';

import Team from './team.model';
import config from '../../config/environment';
var request = require("request");

var sg = require('sendgrid')(process.env.TIF);

export function submit(req, res) {
  // console.log(req.body);
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
      team.save();
  return null;
}
