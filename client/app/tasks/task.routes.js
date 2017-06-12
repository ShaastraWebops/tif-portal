'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('admintasks', {
      url: '/admintasks',
      template: '<admintask></admintask>',
      authenticate: 'admin'
    })
    .state('usertasks', {
      url: '/usertasks',
      template: '<usertask></usertask>',
      authenticate: true
    })
    .state('users', {
      url: '/users/:id',
      template: '<users></users>',
      authenticate: true
    });
}
