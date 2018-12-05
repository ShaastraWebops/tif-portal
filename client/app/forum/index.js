'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './forum.routes';
import forumHome from './forumHome';
import addQuestion from './addQuestion';

export default angular.module('caportalApp.forumMain', [uiRouter, forumHome, addQuestion])
  .config(routing)
  .name;
