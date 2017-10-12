import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  awesomeThings = [];
  newThing = '';


  /*@ngInject*/
  constructor($http,$scope,Auth,$state) {
    this.$http = $http;
    this.Auth = Auth;
    this.$state=$state;
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedInSync;
    $scope.show=false;
    $scope.fbshow=false;
  }

  $onInit() {
    this.Auth.isLoggedIn().then(res => {
      if(res)
      {
        this.$http.get('/api/users/me').then(res => {
           if(res.status === 200)
           {
             if(res.data.fbdob){
               this.$scope.dob = res.data.fbdob;
               this.$scope.fbshow = true;
             }
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
    // this.$http.get('/api/things')
    //   .then(response => {
    //     this.awesomeThings = response.data;
    //   });
  }
 redirectform(){
  if(this.isLoggedIn())
    this.$state.go('submit');
  else
    this.$state.go('signup');
 }
}

export default angular.module('caportalApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
