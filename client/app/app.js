'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngFilesaver from 'angular-file-saver';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import list from './list/list.component';
import task from './tasks/task.component';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import submit from './submit/submit.component';
import leaderboard from './leaderboard/leaderboard.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.css';

angular.module('caportalApp', [ngCookies, ngFilesaver, ngResource, ngSanitize, uiRouter, uiBootstrap, _Auth,
  account, admin, 'validation.match', navbar, task, list, footer, main, submit, leaderboard, constants, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['caportalApp'], {
      strictDi: false
    });
  });
