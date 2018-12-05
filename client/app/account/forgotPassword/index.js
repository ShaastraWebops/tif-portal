'use strict';

import angular from 'angular';
import fpController from './forgotPassword.controller';

export default angular.module('caportalApp.forgotpassword', [])
  .controller('fpController', fpController)
  .name;
