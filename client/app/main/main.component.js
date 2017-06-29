import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  awesomeThings = [];
  newThing = '';


  /*@ngInject*/
  constructor($http,$scope,Auth) {
    this.$http = $http;
    this.Auth = Auth;
    this.$scope = $scope;
    $scope.show=false;
  }

  $onInit() {
    this.Auth.isLoggedIn().then(res => {
      if(res)
      {
        this.$http.get('/api/users/me').then(res => {
           if(res.status === 200)
           {
             if(res.data.dob){
             this.$scope.show = true;
             this.$scope.month = res.data.dob.month;
             this.$scope.day = res.data.dob.day;
             this.$scope.year = res.data.dob.year;
           }
           else {
             this.$scope.show = true;
             this.$scope.month = "Not Provided";
           }
           }
        });
      }
    });
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('caportalApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
