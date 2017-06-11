'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');


import routes from './task.routes';

export class AdminComponent {
  /*@ngInject*/
  val = {};
  user = {};
  constructor($http, $scope, $stateParams) {
    this.$http = $http;
    this.$scope = $scope;
    $scope.pending= [];
      if($stateParams.id)
      {
        this.taskid = $stateParams.id;
      }
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
    this.users = [];
    if(this.taskid){
      this.$http.get('/api/tasks/'+this.taskid).then(res => {
        console.log(res.data);
        if(res.data.success)
        {
          this.taskname = res.data.task.title;
        }
      });

      this.$http.get('/api/tasks/getusers/' + this.taskid).then(res => {
        this.users = res.data.users;
      });
      this.file = function(files,name){
        this.$scope.name =  name;
        this.$scope.fileshow = true;
        for(var i=0;i<files.length;i++)
        {
          if(files[i].taskid === this.taskid)
          {
            this.$scope.url = '/image/' + files[i].name;
            break;
          }
        }
      }
      this.back = function(){
        this.$scope.fileshow = false;
        console.log("hi");
      }
    }
    else{
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
}

export class UserComponent {


  constructor($http,$scope){
     this.$http=$http;
     this.$scope = $scope;
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
      this.fileuploaded = false;
      this.uploaded = function() {
        this.fileuploaded = true;
      }
  }

  apply(task) {
    console.log(this.fileuploaded);
    if(this.fileuploaded){
      this.$http.put('/api/tasks/apply/' + task).then(res => {
        if(res.data.success)
        {
          this.success = res.data.message;
          this.error=false;

          var formData = new FormData;

          var file = $('#file')[0].files[0];
          console.log(file);
          formData.append('uploadedFile', file);
          this.$http.post('/api/uploads/' + task, formData, {

            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          }).then(response => {
          });
        }
        else {
          this.error = res.data.message;
          this.success = false;
        }
        this.gettasks();
      });
    }
    else {
      this.error = "No file uploaded";
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
  .component('users', {
    template: require('./users.html'),
    controller: AdminComponent,
    controllerAs: 'taskCtrl'
  })
  .name;
