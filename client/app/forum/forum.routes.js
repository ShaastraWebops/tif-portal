'use strict';

export default function routesForum($stateProvider) {
  'ngInject';

  $stateProvider.state('forumHome', {
    url: '/forumHome',
    template: require('./forumHome/forumHome.html'),
    controller: 'forumHomeController',
    controllerAs: 'vm',
    authenticate: true
  })
  .state('addQuestion', {
    url: '/addQuestion',
    template: require('./addQuestion/addQuestion.html'),
    controller: 'addQuestionController',
    controllerAs: 'vm',
    authenticate: true
  });
}
