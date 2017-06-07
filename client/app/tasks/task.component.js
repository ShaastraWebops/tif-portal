'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');


import routes from './task.routes';

export class AdminComponent {
  /*@ngInject*/
  val = {};
  user = {};
  constructor($http, $scope) {
    this.$http = $http;
    this.$scope = $scope;
    $scope.years = [2016, 2017, 2018, 2019, 2020];
    $scope.months = [
     'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
   ];
   $scope.setday = function() {
   if($scope.month === 'January' || $scope.month === 'March'|| $scope.month === 'May' || $scope.month === 'July'||$scope.month === 'August' || $scope.month === 'October' || $scope.month === 'December')
   {
     $scope.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
   }
   else if($scope.month === 'February')
   {
     if($scope.year == 2016 || $scope.year == 2020){
       $scope.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
     }
     else {
       $scope.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
     }
   }
   else {
     $scope.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
   }
 }
  }

  $onInit() {
    this.form=false;
    this.task={};
    this.task.deadline={};
    this.create=function(){
    this.form=!this.form;
    this.message=false;
    }

    this.gettasks = function() {
      this.$http.get('/api/tasks/gettasks').then(res => {
        if(res.status==200){
          this.tasks=res.data;
        }
      });
    }
    this.gettasks();
    this.createtask=function(){
      this.task.deadline.month=this.$scope.month;
      this.task.deadline.day=this.$scope.day;
      this.task.deadline.year=this.$scope.year;
      this.$http.post('/api/tasks/create',this.task).then(response => {
        if(response.data.success){
          this.message=response.data.message;
          this.gettasks();
          this.task={};
        }
      });
    }

}
}

export class UserComponent {


  constructor($http){
     this.$http=$http;
  }

  $onInit(){

      this.$http.get('/api/tasks/gettasks').then(res => {
        if(res.status==200){
          this.tasks=res.data;
        }
      });

      this.apply = function(task) {
        this.$http.put('/api/tasks/apply/' + task).then(res => {
          if(res.data.success)
          {
            this.success = res.data.message;
            this.error=false;
          }
          else {
            this.error = res.data.message;
            this.success = false;
          }
        });
      }

  }

}

export default angular.module('caportalApp.task', [uiRouter])
  .config(routes)
  .component('admintask', {
    template: require('./admintask.html'),
    controller: AdminComponent,
    controllerAs: 'taskCtrl'
  })
  .component('usertask', {
    template: require('./usertask.html'),
    controller: UserComponent,
    controllerAs: 'taskCtrl'
  })
  .name;
