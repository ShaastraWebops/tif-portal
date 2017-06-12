'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './leaderboard.routes';

export class LeaderboardComponent {
  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.http = $http;
  }

  $onInit() {

    this.http.get('/api/users/').then(response => {

      var usersUnsorted = response.data;

//sorting function
      function compare(a, b){

        if (a.points < b.points) {
          return 1;
        }
        if (a.points > b.points) {
          return -1;
        }
        return 0;
      }

      this.users = usersUnsorted.sort(compare);
    });
  }
}

export default angular.module('caSite2018App.leaderboard', [uiRouter])
  .config(routes)
  .component('leaderboard', {
    template: require('./leaderboard.html'),
    controller: LeaderboardComponent,
    controllerAs: 'leaderboardCtrl'
  })
  .name;
