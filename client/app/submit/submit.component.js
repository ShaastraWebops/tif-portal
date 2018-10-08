'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './submit.routes';

export class SubmitComponent {
  /*@ngInject*/
  val = {};
  user = {};
  constructor(Auth, $scope, $http, $timeout) {
    this.submit = {};
    this.$http = $http;
    this.submitted = false;
    this.$timeout = $timeout;
    this.currpage = 2;//First Page to add details for google sign in if included back
    this.othervertical = '';
    this.verticals = ['Agriculture', 'Transportation', 'Robotics', 'Healthcare', 'Communication', 'Green Technology', 'Home Comfort'];
    this.date = false;
  }

  $onInit() {
    var app = this;
    this.$http.get('/api/users/me').then(res => {
      this.success = false;
      this.submit = res.data;
      this.$http.get('/api/users/getTeam/' + res.data.teamname).then(res => {
        this.submit.teammates = res.data.teammates;
        this.submit.projname = res.data.projname;
        this.submit.projdetails = res.data.projdetails;
        this.submit.vertical = res.data.vertical;
        this.submit.questions = res.data.questions;
        app.othervertical = res.data.vertical;
        if (this.submit.teammates.mem2_email) {
          if (this.submit.teammates.mem1_email !== this.submit.email) {
            this.submit.teammates.mem2_email = this.submit.teammates.mem1_email;
            this.submit.teammates.mem2_name = this.submit.teammates.mem1_name;
            this.submit.teammates.mem2_phno = this.submit.teammates.mem1_phno;
          }
        }
      });
      this.data = true;
      // this.iagree = true;
      if (!res.data.teammates)
        this.submit.teammates = {};
      if (!res.data.questions)
        this.submit.questions = {};
      if (res.data.vertical == null) { this.vertical = false; }

      if ((this.verticals.indexOf(res.data.vertical) == -1) && res.data.vertical != null)
        this.verticals.push(res.data.vertical);
      // this.othervertical=res.data.vertical;

    });
  }
  showpage(pgno) { return pgno == this.currpage; }
  saveform(state, ind) {
    this.$http.put('/api/users/submit/false', this.submit)
      .then(resp => {
        this.submitted = false;
        if (resp.data.success == true) {
          alert('Progress Saved');
          this.currpage += ind;
          // window.location='/submit';
        } else {
          alert('Team name taken');
        }
      });
    this.submitted = true;

  }
  validateTeamMembers() {
    var submit = this.submit;
    var app = this;
    if (submit.teammates.mem2_email != '' && submit.teammates.mem2_email != null) {
      app.$http.get('/api/users/checkUser/' + submit.teammates.mem2_email).then(function(res) {
        if (res.data.success) {
          if (submit.teammates.mem3_email != '' && submit.teammates.mem3_email != null) {
            app.$http.get('/api/users/checkUser/' + submit.teammates.mem3_email).then(function(res) {
              if (res.data.success) {
                if (submit.teammates.mem4_email != '' && submit.teammates.mem4_email != null) {
                  app.$http.get('/api/users/checkUser/' + submit.teammates.mem4_email).then(function(res) {
                    if (res.data.success) {
                      app.saveform(true, 1);
                    } else {
                      alert('User not registered');
                    }
                  });
                } else {
                  app.saveform(true, 1);
                }
              } else {
                alert('User not registered');
              }
            });
          } else {
            app.saveform(true, 1);
          }
        } else {
          alert('User not registered');
        }
      });
    } else {
      app.saveform(true, 1);
    }
  };
  next() {
    this.saveform(true, 1);
   // this.validateTeamMembers();
  };
  back() {
    this.currpage -= 1;
  };
  optionchoser() {
    this.submit.vertical = this.othervertical;
    this.verticals.push(this.othervertical);
  }



  isrequired(index) {
    if (!this.data) return true;
    // console.log("test",this.submit.teammates.mem6_name == '' || this.submit.teammates.mem6_name == null )

    if (this.submit.teammates.mem4_name != '' && this.submit.teammates.mem4_name != null || this.submit.teammates.mem4_email != '' && this.submit.teammates.mem4_email != null || this.submit.teammates.mem4_phno != '' && this.submit.teammates.mem4_phno != null) {
      // console.log("4",true);
      if (index <= 4)
        return true;
    }
    if (this.submit.teammates.mem3_name != '' && this.submit.teammates.mem3_name != null || this.submit.teammates.mem3_email != '' && this.submit.teammates.mem3_email != null || this.submit.teammates.mem3_phno != '' && this.submit.teammates.mem3_phno != null) {
      // console.log("3",true);
      if (index <= 3)
        return true;
    }
    if (this.submit.teammates.mem2_name != '' && this.submit.teammates.mem2_name != null || this.submit.teammates.mem2_email != '' && this.submit.teammates.mem2_email != null || this.submit.teammates.mem2_phno != '' && this.submit.teammates.mem2_phno != null) {
      // console.log("2",true);
      if (index <= 2)
        return true;
    }
    return false;
  }

  submitform() {
    if (!this.submit.submitted && confirm("Are you Sure? This is final")) {
      this.$http.put('/api/users/submit/true', this.submit)
        .then(resp => {
          if (resp.data.success == true) {
            alert('Successfully Registered');
          }
        });
      this.submitted = true;
      window.location = '/';
    }
  }
}

export default angular.module('caportalApp.submit', [uiRouter])
  .config(routes)
  .component('submit', {
    template: require('./submit.html'),
    controller: SubmitComponent,
    controllerAs: 'submitCtrl'
  })
.name;
