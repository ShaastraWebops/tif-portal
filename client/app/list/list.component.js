'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');


import routes from './list.routes';

export class ListComponent {
  /*@ngInject*/
  val = {};
  user = {};
  constructor($http, FileSaver) {
    this.$http = $http;
    this.FileSaver = FileSaver;
    this.index = 1;
    this.user = {}
  }

  $onInit() {

    this.$http.get('/api/users/me').then(res => {
      if(res.status === 200){
        this.grapevine = (res.data.email.endsWith('@thegrapevine.co.in'));
      }
    });

    this.users = [];
    this.$http.get('/api/users/list').then(response => {
      if(response.status === 200) {
        this.users = response.data;
        this.user = this.users[0];
      }
    });
    this.export = function() {
      console.log('comes here');
      this.$http.get('/api/users/export').then(response => {
        var data = new Blob([response.data], { type: 'text/csv;charset=utf-8' });
        this.FileSaver.saveAs(data, 'users.csv');
      });
    };

    this.changed = function(){
      this.user = this.users[this.index-1];
    }
  }

  selected(id){
    this.$http.put('/api/users/selected/'+id).then(res => {
      if(res.status === 200)
      {
        this.$http.get('/api/users/list').then(response => {
          if(response.status === 200) {
            this.users = response.data;
          }
        });
      }
    });
  }

  rejected(id){
    this.$http.put('/api/users/rejected/'+id).then(res => {
      if(res.status === 200)
      {
        this.$http.get('/api/users/list').then(response => {
          if(response.status === 200) {
            this.users = response.data;
          }
        });
      }
    });
  }
}

export default angular.module('caportalApp.list', [uiRouter])
  .config(routes)
  .component('list', {
    template: require('./list.html'),
    controller: ListComponent,
    controllerAs: 'listCtrl'
  })
  .name;
