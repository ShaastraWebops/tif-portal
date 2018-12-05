'use strict';

import angular from 'angular';
import forumHomeController from './forumHome.controller';

export default angular.module('caPortalApp.forumHome', [])
  .controller('forumHomeController', forumHomeController)
  .name;
