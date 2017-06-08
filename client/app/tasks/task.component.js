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
          this.tasks=res.data.tasks;
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

  gettasks() {

    this.$http.get('/api/tasks/gettasks').then(res => {
      if(res.status==200){
        const resp = res.data;
        var tasksArray = resp.tasks;
        const userid = resp.userid;
        var tasksFinalArray = [];

        for (var i = 0; i < tasksArray.length; i++) {

          var task = {

            _id: tasksArray[i]._id,
            title: tasksArray[i].title,
            description: tasksArray[i].description,
            deadline: tasksArray[i].deadline,
            points: tasksArray[i].points,
            applyDisable: false
          };

          for (var j = 0; j < tasksArray[i].pending.length; j++) {

            var pendingArray = tasksArray[i].pending;
            if (pendingArray[j] == userid) {

              task.applyDisable = true;
              break;
            }
            else if (pendingArray[j] != userid) {

              task.applyDisable = false;
            }
          }
          tasksFinalArray.push(task);
        }
        this.tasks = tasksFinalArray;
      }
    });
  }

  $onInit(){
      this.gettasks();
  }

  apply(task) {

      this.$http.put('/api/tasks/apply/' + task).then(res => {
        if(res.data.success)
        {
          this.success = res.data.message;
          this.error=false;

          var formData = new FormData;

          var file = $('#file')[0].files[0];
          formData.append('uploadedFile', file);

          this.$http.post('/api/uploads/', formData, {

            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          }).then(response => {

            console.log(response);
          });
        }
        else {
          this.error = res.data.message;
          this.success = false;
        }
        this.gettasks();
      });
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
