'use strict';

import angular from 'angular';
import addQuestionController from './addQuestion.controller';

export default angular.module('caPortalApp.addQuestion', [])
  .controller('addQuestionController', addQuestionController)
  .name;
