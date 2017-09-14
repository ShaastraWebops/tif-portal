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
  }

  $onInit() {
    this.$http.get('/api/users/me').then(response => {
      this.success = false;
      this.submit = response.data;
      console.log(this.submit);
      this.previous;
      if(this.submit.previous) {
        this.previous = 'yes';
      } else {
        this.previous = 'no';
      }
      this.iagree = false;


    });
  }
  showpage(pgno){return pgno == this.currpage;}
  next() {this.currpage += 1;};
  back() { this.currpage -= 1;};

  submitform() {
    if(this.previous === 'yes') {
      this.submit.previous = true;
    } else {
      this.submit.previous = false;
    }
    if(this.submit.fblink === null||this.submit.fblink === '')
    {
      this.submit.fblink = '';
    }
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
