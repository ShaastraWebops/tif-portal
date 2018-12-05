'use strict';

export default class addQuestionController {
  /*@ngInject*/
  newQuestion = {
    name: '',
    email: '',
    body: '',
    heading: '',
    isAnonymous: false,
  };
  submitted = false;
  error = false;
  message = '';
  constructor(Auth, $http) {
    this.getCurrentUser = Auth.getCurrentUser;
    this.$http = $http;
  }
  $onInit() {
    this.getCurrentUser(user => {
      this.newQuestion.name = user.name;
      this.newQuestion.email = user.email;
      this.newQuestion.userId = user._id;
    });
  }
  addQuestion(form) {
    if(form.$valid && this.newQuestion.heading && this.newQuestion.body) {
      this.newQuestion.date = new Date();
      if( this.newQuestion.isAnonymous ){
        this.newQuestion.name = 'Anonymous';
        this.newQuestion.email = 'Anonymous';
        this.newQuestion.userId = 'Anonymous';
      }
      this.$http.put('/api/users/aq', this.newQuestion)
        .then(resp => {

          this.submitted = false;
          if (resp.status == 200) {
            this.message = 'Question Posted Successfully';
            this.error = false;
          } else {
            this.message = 'Process Failed, please try again';
            this.error = true;
          }
          this.submitted = true;
          this.newQuestion.heading = '';
          this.newQuestion.body = '';
        });
    }
  }
  }
