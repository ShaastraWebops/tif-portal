'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('leaderboard', {
      url: '/leaderboard',
      template: '<leaderboard></leaderboard>'
    });
}
