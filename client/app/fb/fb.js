'use strict';

angular.module('caSite2018App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fb', {
        url: '/fb',
        templateUrl: 'app/fb/fb.html',
        controller: 'FbCtrl'
      });
  });