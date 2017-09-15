'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './submit.routes';

export class SubmitComponent {
  /*@ngInject*/
  val = {};
  user = {};
  constructor(Auth, $scope, $http, $timeout) {
    this.submit = {};
    this.$http = $http;
    this.$timeout = $timeout;
    this.currpage=3;
    this.vertical=true;
    this.othervertical='';
  }

  $onInit() {
    this.$http.get('/api/users/me').then( res => {
      this.success = false;
      this.submit = res.data;
      console.log(this.submit);
      this.iagree = true;
    this.verticals=['Agriculture','Transportation','Robotics','Healthcare','Communication','Green Technology','Home Comfort'];
    if((this.verticals.indexOf(res.data.vertical) == -1) && res.data.vertical!=null)
      this.verticals.push(res.data.vertical);
    // this.othervertical=res.data.vertical;
    if (res.data.vertical == null) {this.vertical=false;}
    });
  }
  showpage(pgno){return pgno == this.currpage;}
  next() {this.currpage += 1;};
  back() { this.currpage -= 1;};
  optionchoser(){
    this.submit.vertical=this.othervertical;
this.verticals.push(this.othervertical);


  }
  submitform() {
    console.log('bef',this.submit);
    this.$http.put('/api/users/submit', this.submit)
    .then(resp => {
      console.log('after',resp.data);
      if(resp.data.success == true) {
        alert('Successfully Registered');
        window.location='/';
      }
    });
  }
}

export default angular.module('caportalApp.submit', [uiRouter])
  .config(routes)
  .component('submit', {
    template: require('./submit.html'),
    controller: SubmitComponent,
    controllerAs: 'submitCtrl'
  })
  .name;
