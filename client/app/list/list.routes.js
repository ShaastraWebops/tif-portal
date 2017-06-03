'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('list', {
      url: '/list',
      template: '<list></list>',
      authenticate: false
    });
}
