'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './submit.routes';

export class SubmitComponent {
  /*@ngInject*/
  val = {};
  user = {};
  constructor(Auth, $scope,$http,$timeout) {
    this.submit={};
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser().$promise.then(function(data){
      $scope.val = JSON.parse(angular.toJson(data));
    });
    this.$http=$http;
    this.$timeout=$timeout;
  }

  $onInit(){
    this.a=true;
    this.$http.get('/api/users/me').then(response => {
    this.success=false;
    this.submit=response.data;
    console.log(this.submit);
    this.previous;
    if(this.submit.previous){
      this.previous='yes';
    }
    else {
      this.previous='no';
    }
    this.iagree=false;
    this.next=function(){
      this.a=false;
    }
    this.back=function(){
      this.a=true;
    }
    this.submitform=function(){
      if(this.previous==='yes'){
        this.submit.previous=true;
      }
      else {
        this.submit.previous=false;
      }
      this.$http.put('/api/users/submit',this.submit)
        .then(response => {
          console.log(response.data);
          if(response.data.success==true){
          this.success="Form Successfully submitted";
          }
        });
    };
  });
  }
}

export default angular.module('caportalApp.submit', [uiRouter,])
  .config(routes)
  .component('submit', {
    template: require('./submit.html'),
    controller: SubmitComponent,
    controllerAs: 'submitCtrl'
  })
  .name;
