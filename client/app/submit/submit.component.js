'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './submit.routes';

export class SubmitComponent {
  /*@ngInject*/

  user = {
    name: '',
    collName: '',
    collAddress: '',
    collCity: '',
    collState: '',
    degree: '',
    branch: '',
    year: '',
    postAddress: '',
    postCity: '',
    postState: '',
    postPINCode: ''
  }

  constructor(Auth) {
    this.message = 'Hello';

    this.getCurrentUser = Auth.getCurrentUserSync;
    this.val = this.getCurrentUser();

    console.log(this.val.email);
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
