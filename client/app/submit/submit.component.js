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
    this.$timeout = $timeout;
    this.currpage=3;
    this.verticals=['Agriculture','Transportation','Robotics','Healthcare','Communication','Green Technology','Home Comfort'];
    this.vertical='';
    this.othervertical='';
  }

  $onInit() {
    this.$http.get('/api/users/me').then(response => {
      this.success = false;
      this.submit = response.data;
      console.log(this.submit);
      this.iagree = true;
    });
  }
  showpage(pgno){return pgno == this.currpage;}
  next() {this.currpage += 1;};
  back() { this.currpage -= 1;};

  submitform() {
    this.$http.put('/api/users/submit', this.submit)
    .then(resp => {
      console.log(response.data);
      if(resp.data.success == true) {
        alert('Successfully Registered');
        window.location='/';
      }
    });
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
