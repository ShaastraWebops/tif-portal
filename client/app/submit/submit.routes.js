'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('submit', {
      url: '/submit',
      template: '<submit></submit>'
    });
}
