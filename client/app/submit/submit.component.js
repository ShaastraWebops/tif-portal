'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './submit.routes';

export class SubmitComponent {
  /*@ngInject*/
  val = {};
  user = {};

  constructor(Auth, $scope) {
    
    this.getCurrentUser = Auth.getCurrentUserSync;
    console.log(this.user);
    this.getCurrentUser().$promise.then(function(data){
      $scope.val = JSON.parse(angular.toJson(data));
    });
  }

  $onInit(){

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