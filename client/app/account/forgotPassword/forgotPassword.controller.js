'use strict';

export default class fpController {
  /*@ngInject*/
  constructor($http, $state) {
    this.$state = $state;
    this.$http = $http;
    this.blah="forgotpassword controller blah";
    this.submitted = false;
    this.message = '';
    this.reset={};
    // this.$state.go('main');

  }


  forgotPassword(form) {
    this.submitted = true;
    this.message = 'Working...';

    if(form.$valid) {
      this.$http.post('/api/users/forgotPassword', { email: this.reset.email })
      .then((message) => {
        this.message = 'Sent a mail to ' + this.reset.email + ' with further information';
              this.reset.email = '';
      })
      .catch((message) =>{
        this.message = 'Email does not exist (or) some error has occurred';
        this.reset.email = '';
      });
    }
  }
}
