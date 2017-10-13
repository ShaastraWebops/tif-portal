'use strict';

import angular from 'angular';

export default class SignupController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;


  /*@ngInject*/
  constructor(Auth, $state,$scope,$http) {
    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;
    this.$scope = $scope;
  }

  register(form) {
    this.submitted = true;
    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        phonenumber: this.user.phonenumber,
        tifID: '',
        password: this.user.password,
        college: this.user.college,
        education: this.user.education,
        // dob: {
        //   month: this.$scope.month || null,   //as date of birth is commented out in html file
        //   day: this.$scope.day || null,
        //   year: this.$scope.year || null
        // }
      })
        .then(() => {
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}
