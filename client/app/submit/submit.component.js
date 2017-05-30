'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './submit.routes';

export class SubmitComponent {
  /*@ngInject*/
  val = {};
  user = {};
  constructor(Auth, $scope,$http) {
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.getCurrentUser().$promise.then(function(data){
      $scope.val = JSON.parse(angular.toJson(data));
    });
    this.$http=$http;
  }

  $onInit($timeout,$location){
    this.a=true;
    this.submit={};
    this.previous;
    this.iagree=false;
    this.next=function(){
      this.a=false;
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
          if(response.success==true){
          $timeout(function(){
           this.success="Form Successfully Submitted.";
          },1500);
          }
        });
    };
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
