'use strict';

import angular from 'angular';
import fpController from './forgotPassword.controller';

export default angular.module('caPortalApp.forgotpassword', [])
  .controller('fpController', fpController)
  .name;
