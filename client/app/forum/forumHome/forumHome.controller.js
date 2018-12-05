'use strict';

export default class forumHomeController {
  page = 1;
  questions = [];
  questionOnPage = [];
  question = '';
  answers=[];
  questionPerPage=5;
  totalQuestions=0;
  pages=[];
  allQuestions=true;
  qIdx = 0;
  typing=false;
  qId=0;
  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  $onInit() {
    this.$http.get(`/api/users/questions/${this.page}`).then(res => {
      this.questions = res.data;
      this.totalQuestions = this.questions.length;
      var i;
      for( i = 0 ; i < this.totalQuestions/this.questionPerPage ; i++ ){
        this.pages[i] = i+1;
      }

      this.changePage(0);

    });
    this.getCurrentUser(user => {
      this.name = user.name;
      this.email = user.email;
      this.userId = user._id;
    });
  }

  getDateDiff(startDate) {
    startDate = new Date(startDate);
    var endDate = new Date();
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    if(days)
      return `${days} days`;
    else if(hours)
      return `${hours} hr`;
    else if(minutes)
      return `${minutes} min`;
    else if(seconds)
      return `${seconds} sec`;
    else {
      return `Few moments`;
    }
}

answerQuestion(index){
  this.question = this.questions[index];
  this.qId = this.question._id;
  this.qIdx = index;
  if(this.questions[index].answer.length == 0){
    this.answers = [{body:'No answers yet......',date:'',name:''}];
  }
  else{
      this.answers = this.questions[index].answer;
    }
    if(this.allQuestions)
      this.getAllQuestions();
    else{
      this.getAskedQuestions();
    }
  }

addAnswer(form){
  if(form.$valid && this.answer) {
    var answer = {};
    answer.date = new Date();
    answer.name = this.name;
    answer.email = this.email;
    answer._id = this.userId;
    answer.body = this.answer;
    this.$http.put(`/api/users/addAnswer/${this.question._id}`, answer)
      .then(resp => {
        this.submitted = false;
        this.typing=false;
        if (resp.status == 200) {
          this.message = 'Answer Posted Successfully';
          this.error = false;
        } else {
          this.message = 'Process Failed, please try again';
          this.error = true;
        }
        this.submitted = true;
        this.answer = '';
        this.$http.get(`/api/users/questions/${this.page}`).then(res => {
          this.questions = res.data;
          this.answerQuestion(this.qIdx);
        });
      });
  }
}

changePage(index){
  this.page = index+1;
  this.questionOnPage = this.questions.slice(index*this.questionPerPage, this.questionPerPage*(index+1));
  if( this.totalQuestions <= 0 ){
    this.questionOnPage = [{ title: '', body: 'No questions Yet......' }];
    this.totalQuestions = 0;
  }
}

getAskedQuestions(){
  this.$http.get(`/api/users/getAskedQuestions/${this.userId}`).
  then(resp => {
    this.questions = resp.data;
    this.changePage(0);
    this.allQuestions = false;
  });
}

getAllQuestions(){
  this.$http.get(`/api/users/questions/${this.page}`).then(res => {
    this.questions = res.data;
    this.totalQuestions = this.questions.length+1;
    var i;
    for( i = 0 ; i < this.totalQuestions/this.questionPerPage ; i++ ){
      this.pages[i] = i+1;
    }

    this.changePage(0);
    this.allQuestions = true;
  });
}

deleteQuestion(index){
  if(confirm("Are you sure, you want to delete this question?")){
    this.$http.delete(`/api/users/deleteQuestion/${index}`).then(res => {
      if(this.allQuestions)
        this.getAllQuestions();
      else{
        this.getAskedQuestions();
      }
    });
  };

}

deleteAnswer(index) {
  if(confirm("Are you sure, you want to delete this answer?")){
    this.$http.put(`/api/users/deleteAnswer/${this.qId}/${index}`).then(res => {
      this.questions[this.qIdx].answer = res.data;
      this.answerQuestion(this.qIdx);
    });
  };
}

}
